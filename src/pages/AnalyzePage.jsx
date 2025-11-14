/* src/pages/AnalyzePage.jsx */
import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import SurveyForm from '../components/SurveyForm';
import { useTranslation } from 'react-i18next';
import PageHeader from '../components/PageHeader';
import { emotionAPI, surveyAPI } from '../services/api';
import { toast } from 'react-toastify';

const PageContainer = styled.div`
  padding: 3rem 1rem;
`;

const StartButton = styled.button`
  padding: 1rem 2.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #b84182ff 0%, #ddc9bfff 100%);
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const StartContainer = styled.div`
  text-align: center;
  padding: 0.5rem 1rem;
`;

const Video = styled.video`
  position: absolute;
  width: 640px;
  height: 480px;
  opacity: 0;
  pointer-events: none;
  z-index: -1;
`;

const Canvas = styled.canvas`
  display: none;
`;

const StatusText = styled.div`
  text-align: center;
  margin-top: 1rem;
  color: #666;
  font-size: 0.9rem;
`;

function AnalyzePage() {
  const { t } = useTranslation();
  const [isSurveyStarted, setIsSurveyStarted] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [frameCount, setFrameCount] = useState(0);
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const intervalRef = useRef(null);
  const isAnalyzingRef = useRef(false);
  const sessionIdRef = useRef(null);
  const isRecordingRef = useRef(false);
  
  // 디버깅용 카운터
  const captureAttemptsRef = useRef(0);
  const captureSuccessRef = useRef(0);
  const analysisSuccessRef = useRef(0);
  const analysisFailRef = useRef(0);
  const vectorSendSuccessRef = useRef(0);
  const vectorSendFailRef = useRef(0);

  // 웹캠 시작
  const startWebcam = async () => {
    try {
      console.log('🎥 웹캠 접근 요청 중...');
      // 비디오 크기 제약 완화: ideal 사용 (카메라가 지원하는 최적 크기 사용)
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 640 },
          height: { ideal: 480 }
        } 
      });
      
      // 스트림 활성 상태 확인 및 로깅 강화
      const videoTrack = stream.getVideoTracks()[0];
      const trackSettings = videoTrack?.getSettings();
      console.log('📹 스트림 받음:', {
        active: videoTrack?.readyState === 'live',
        enabled: videoTrack?.enabled,
        label: videoTrack?.label,
        readyState: videoTrack?.readyState,
        settings: trackSettings,
        실제비디오크기: `${trackSettings?.width || 'unknown'}x${trackSettings?.height || 'unknown'}`
      });
      
      // 스트림 트랙의 enabled 상태 확인
      if (!videoTrack?.enabled) {
        console.warn('⚠️ 비디오 트랙이 비활성화되어 있습니다. 활성화합니다.');
        videoTrack.enabled = true;
      }
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        const video = videoRef.current;
        
        // 비디오 속성 강제 설정
        video.muted = true; // autoplay를 위해 필요
        video.playsInline = true;
        video.autoplay = true;
        
        console.log('📹 비디오 속성 설정:', {
          muted: video.muted,
          playsInline: video.playsInline,
          autoplay: video.autoplay
        });
        
        video.srcObject = stream;
        
        // 비디오가 준비되고 재생될 때까지 대기 (더 적극적으로 처리)
        await new Promise((resolve, reject) => {
          if (!video) {
            reject(new Error('비디오 요소가 없습니다.'));
            return;
          }
          
          let metadataLoaded = false;
          let dataLoaded = false;
          let canPlay = false;
          let playingStarted = false;
          let playAttempts = 0;
          const maxPlayAttempts = 5;
          
          const checkComplete = () => {
            if (video.readyState >= video.HAVE_METADATA && !video.paused) {
              console.log('✅ 비디오 준비 완료:', {
                width: video.videoWidth,
                height: video.videoHeight,
                readyState: video.readyState,
                paused: video.paused,
                ended: video.ended,
                metadataLoaded,
                dataLoaded,
                canPlay,
                playingStarted
              });
              cleanup();
              resolve();
            }
          };
          
          const cleanup = () => {
            video.removeEventListener('loadedmetadata', onLoadedMetadata);
            video.removeEventListener('loadeddata', onLoadedData);
            video.removeEventListener('canplay', onCanPlay);
            video.removeEventListener('playing', onPlaying);
            video.removeEventListener('play', onPlay);
            video.removeEventListener('error', onError);
          };
          
          const onLoadedMetadata = () => {
            metadataLoaded = true;
            console.log('✅ 비디오 메타데이터 로드 완료:', {
              width: video.videoWidth,
              height: video.videoHeight,
              readyState: video.readyState
            });
            checkComplete();
          };
          
          const onLoadedData = () => {
            dataLoaded = true;
            console.log('✅ 비디오 데이터 로드 완료:', {
              readyState: video.readyState
            });
            checkComplete();
          };
          
          const onCanPlay = () => {
            canPlay = true;
            console.log('✅ 비디오 재생 가능:', {
              readyState: video.readyState
            });
            checkComplete();
          };
          
          const onPlay = () => {
            console.log('▶️ 비디오 play 이벤트 발생');
            checkComplete();
          };
          
          const onPlaying = () => {
            playingStarted = true;
            console.log('▶️ 비디오 재생 시작됨 (playing 이벤트)');
            checkComplete();
          };
          
          const onError = (err) => {
            console.error('❌ 비디오 오류:', err);
            cleanup();
            reject(err);
          };
          
          // 모든 이벤트 리스너 추가
          video.addEventListener('loadedmetadata', onLoadedMetadata);
          video.addEventListener('loadeddata', onLoadedData);
          video.addEventListener('canplay', onCanPlay);
          video.addEventListener('play', onPlay);
          video.addEventListener('playing', onPlaying);
          video.addEventListener('error', onError);
          
          // 비디오 재생 강제 시작 (여러 번 시도)
          const tryPlay = async () => {
            playAttempts++;
            console.log(`▶️ 비디오 재생 시도 #${playAttempts}/${maxPlayAttempts}`);
            
            try {
              const playPromise = video.play();
              if (playPromise !== undefined) {
                await playPromise;
                console.log('✅ 비디오 play() 호출 성공');
                checkComplete();
              }
            } catch (err) {
              console.warn(`⚠️ 비디오 재생 시도 ${playAttempts} 실패:`, err);
              if (playAttempts < maxPlayAttempts) {
                setTimeout(tryPlay, 500);
              } else {
                console.warn('⚠️ 비디오 재생 시도 실패했지만 계속 진행합니다.');
                checkComplete();
              }
            }
          };
          
          // 즉시 재생 시도
          tryPlay();
          
          // 타임아웃 설정 (5초로 단축)
          setTimeout(() => {
            if (!metadataLoaded && !playingStarted) {
              console.warn('⚠️ 비디오 준비 타임아웃, 강제로 진행합니다:', {
                metadataLoaded,
                playingStarted,
                readyState: video.readyState,
                paused: video.paused
              });
              // 타임아웃이어도 계속 진행
              cleanup();
              resolve();
            }
          }, 5000);
        });
      }
      
      // 최종 스트림 상태 확인
      const finalVideoTrack = stream.getVideoTracks()[0];
      console.log('✅ 웹캠 활성화 완료:', {
        active: finalVideoTrack?.readyState === 'live',
        enabled: finalVideoTrack?.enabled,
        readyState: finalVideoTrack?.readyState
      });
    } catch (error) {
      console.error('❌ 웹캠 접근 오류:', error);
      toast.error('웹캠 접근 권한이 필요합니다.');
      throw error;
    }
  };

  // 웹캠 중지
  const stopWebcam = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // 프레임 캡처 및 분석
  const captureAndAnalyze = async () => {
    // 강제로 콘솔에 출력 (필터 무시)
    console.log('='.repeat(50));
    console.log('🔍 captureAndAnalyze 함수 호출됨!');
    console.log('='.repeat(50));
    
    const currentSessionId = sessionIdRef.current;
    captureAttemptsRef.current++;
    
    console.log(`🔍 프레임 캡처 시도 #${captureAttemptsRef.current}:`, {
      hasVideo: !!videoRef.current,
      hasCanvas: !!canvasRef.current,
      hasSessionId: !!currentSessionId,
      isAnalyzing: isAnalyzingRef.current,
      isRecording: isRecordingRef.current,
      videoReadyState: videoRef.current?.readyState,
      videoPaused: videoRef.current?.paused,
      videoEnded: videoRef.current?.ended,
      stats: {
        시도: captureAttemptsRef.current,
        성공: captureSuccessRef.current,
        분석성공: analysisSuccessRef.current,
        분석실패: analysisFailRef.current,
        전송성공: vectorSendSuccessRef.current,
        전송실패: vectorSendFailRef.current
      }
    });
    
    if (!videoRef.current || !canvasRef.current || !currentSessionId) {
      console.log('⏭️ 프레임 캡처 건너뜀 (필수 요소 없음)');
      return;
    }
    
    // 분석 중이면 건너뛰기 (중복 실행 방지)
    if (isAnalyzingRef.current) {
      console.log('⏭️ 프레임 캡처 건너뜀 (이미 분석 중)');
      return;
    }

    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // 비디오가 paused 상태면 강제로 재생 시도
      if (video.paused) {
        console.warn('⚠️ 비디오가 일시정지 상태입니다. 재생 시도...');
        try {
          await video.play();
          console.log('✅ 비디오 재생 성공');
          // 재생 후 잠시 대기
          await new Promise(resolve => setTimeout(resolve, 100));
        } catch (err) {
          console.warn('⚠️ 비디오 재생 실패했지만 계속 진행:', err);
        }
      }
      
      // readyState 체크 완화: HAVE_NOTHING (0)에서도 캡처 시도
      if (video.readyState === 0) {
        console.warn('⚠️ 비디오 readyState가 0이지만 캡처 시도합니다.');
        // 스트림이 있으면 강제로 재생 시도
        if (streamRef.current && video.srcObject) {
          try {
            video.srcObject = streamRef.current;
            await video.play();
            await new Promise(resolve => setTimeout(resolve, 200));
          } catch (err) {
            console.warn('⚠️ 스트림 재연결 실패했지만 계속 진행:', err);
          }
        }
      }
      
      // 비디오 크기가 없으면 경고만 출력하고 계속 진행
      if (video.videoWidth === 0 || video.videoHeight === 0) {
        console.warn('⚠️ 비디오 크기가 0이지만 계속 진행합니다.');
      }
      
      // 비디오가 일시정지되었거나 종료되었으면 경고만 출력하고 계속 진행
      if (video.paused || video.ended) {
        console.warn('⚠️ 비디오가 일시정지되었거나 종료되었지만 계속 진행합니다:', {
          paused: video.paused,
          ended: video.ended
        });
      }
      
      // 스트림 상태 확인 (경고만 출력하고 계속 진행)
      if (streamRef.current) {
        const videoTrack = streamRef.current.getVideoTracks()[0];
        if (videoTrack && videoTrack.readyState !== 'live') {
          console.warn('⚠️ 비디오 트랙이 활성 상태가 아니지만 계속 진행합니다:', {
            readyState: videoTrack.readyState
          });
        }
      }

      console.log('📸 프레임 캡처 시작', {
        videoSize: `${video.videoWidth}x${video.videoHeight}`,
        readyState: video.readyState,
        paused: video.paused,
        ended: video.ended,
        timestamp: new Date().toISOString()
      });

      // Canvas에 프레임 그리기
      // 비디오 크기가 0이면 스트림 설정에서 크기 가져오기
      let canvasWidth = video.videoWidth;
      let canvasHeight = video.videoHeight;
      
      if (canvasWidth === 0 || canvasHeight === 0) {
        // 스트림에서 실제 크기 가져오기
        if (streamRef.current) {
          const track = streamRef.current.getVideoTracks()[0];
          const settings = track?.getSettings();
          if (settings?.width && settings?.height) {
            canvasWidth = settings.width;
            canvasHeight = settings.height;
            console.log('📐 스트림 설정에서 크기 가져옴:', `${canvasWidth}x${canvasHeight}`);
          } else {
            // 최종 폴백: 기본 크기
            canvasWidth = 640;
            canvasHeight = 480;
            console.warn('⚠️ 비디오 크기를 알 수 없어 기본 크기 사용:', `${canvasWidth}x${canvasHeight}`);
          }
        } else {
          canvasWidth = 640;
          canvasHeight = 480;
          console.warn('⚠️ 스트림이 없어 기본 크기 사용:', `${canvasWidth}x${canvasHeight}`);
        }
      }
      
      console.log('📐 Canvas 크기 설정:', `${canvasWidth}x${canvasHeight}`, {
        videoWidth: video.videoWidth,
        videoHeight: video.videoHeight
      });
      
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      console.log('📸 Canvas에 프레임 그리기 완료');
      captureSuccessRef.current++;

      // Canvas를 Blob으로 변환
      canvas.toBlob(async (blob) => {
        const currentSessionId = sessionIdRef.current;
        if (!blob || !currentSessionId) {
          console.log('⏭️ Blob 생성 실패 또는 세션 ID 없음:', {
            hasBlob: !!blob,
            blobSize: blob?.size,
            hasSessionId: !!currentSessionId
          });
          return;
        }

        isAnalyzingRef.current = true;
        let webcamVector = null;
        let analysisTimeoutId = null;
        let isTimedOut = false; // 타임아웃 플래그
        
        // 타임아웃 보호: 15초 후 강제로 기본 벡터 사용 및 리셋 (Python 서버 방식으로 빠름)
        const maxAnalysisTime = 15000;
        analysisTimeoutId = setTimeout(() => {
          if (isAnalyzingRef.current && !webcamVector) {
            isTimedOut = true;
            console.warn('⚠️ 감정 분석 타임아웃 (15초), 기본 벡터 사용');
            webcamVector = [0, 0, 1, 0, 0]; // neutral
            analysisFailRef.current++;
          }
        }, maxAnalysisTime);
        
        try {
          console.log('📸 프레임 캡처 완료', `(${canvas.width}x${canvas.height}, 크기: ${(blob.size / 1024).toFixed(2)}KB)`);
          
          // 이미지를 File로 변환
          const imageFile = new File([blob], `frame_${Date.now()}.jpg`, { type: 'image/jpeg' });
          
          console.log('🚀 감정 분석 API 호출 시작...', {
            fileName: imageFile.name,
            fileSize: imageFile.size,
            fileType: imageFile.type
          });
          
          // 감정 분석 수행
          try {
            const result = await emotionAPI.analyzeEmotionImage(imageFile);
            
            // 타임아웃 타이머 취소
            if (analysisTimeoutId) {
              clearTimeout(analysisTimeoutId);
              analysisTimeoutId = null;
            }
            
            console.log('📥 감정 분석 API 응답 받음:', {
              hasData: !!result.data,
              hasProbs: !!(result.data && result.data.probs)
            });
            
            if (result.data && result.data.probs) {
              webcamVector = result.data.probs;
              analysisSuccessRef.current++;
              console.log('📥 감정 분석 결과:', {
                label: result.data.label,
                score: result.data.score,
                probs: webcamVector,
                probsLength: webcamVector.length
              });
            } else {
              console.warn('⚠️ 감정 분석 결과에 probs가 없습니다:', result);
              // probs가 없으면 기본 벡터 사용
              webcamVector = [0, 0, 1, 0, 0]; // neutral
              analysisFailRef.current++;
            }
          } catch (analysisError) {
            // 타임아웃 타이머 취소
            if (analysisTimeoutId) {
              clearTimeout(analysisTimeoutId);
              analysisTimeoutId = null;
            }
            
            console.error('❌ 감정 분석 실패:', analysisError);
            analysisFailRef.current++;
            
            // Network Error 즉시 처리
            if (analysisError.code === 'ERR_NETWORK' || 
                analysisError.message === 'Network Error' ||
                analysisError.message?.includes('네트워크')) {
              console.error('🚨 Network Error 발생, 즉시 기본 벡터 사용');
              webcamVector = [0, 0, 1, 0, 0]; // neutral
            } else {
              if (analysisError.response) {
                console.error('응답 데이터:', analysisError.response.data);
                console.error('응답 상태:', analysisError.response.status);
              }
              if (analysisError.message) {
                console.error('에러 메시지:', analysisError.message);
              }
              // 감정 분석 실패 시 기본 벡터(neutral) 사용
              webcamVector = [0, 0, 1, 0, 0]; // neutral
            }
            console.log('🔄 감정 분석 실패로 기본 벡터(neutral) 사용:', webcamVector);
          }
          
          // 웹캠 벡터 전송 (성공/실패 여부와 관계없이 시도)
          // 타임아웃이 발생했거나 webcamVector가 설정된 경우에만 전송
          if (webcamVector && webcamVector.length === 5) {
            console.log('📤 웹캠 벡터 전송 시작...', { 
              sessionId: currentSessionId,
              vectorLength: webcamVector.length,
              isRecording: isRecordingRef.current,
              isTimedOut: isTimedOut
            });
            
            try {
              // 세션 상태 재확인 (경고만 출력하고 계속 진행)
              if (!isRecordingRef.current) {
                console.warn('⚠️ 세션이 녹화 중이 아니지만 벡터 전송 시도합니다.');
              }
              
              const pushResult = await emotionAPI.pushWebcamVector(currentSessionId, webcamVector);
              console.log('📤 웹캠 벡터 전송 응답:', pushResult);
              
              vectorSendSuccessRef.current++;
              setFrameCount(prev => {
                const newCount = prev + 1;
                console.log(`✅ 웹캠 벡터 전송 성공 (총 ${newCount}회)${isTimedOut ? ' [타임아웃 후]' : ''}`);
                return newCount;
              });
            } catch (pushError) {
              vectorSendFailRef.current++;
              console.error('❌ 웹캠 벡터 전송 실패:', pushError);
              if (pushError.response) {
                console.error('응답 데이터:', pushError.response.data);
                console.error('응답 상태:', pushError.response.status);
              }
              if (pushError.code === 'ERR_NETWORK' || pushError.message === 'Network Error') {
                console.error('🚨 벡터 전송 Network Error 발생');
              }
              // 전송 실패해도 다음 프레임 캡처는 계속 진행
            }
          } else {
            console.error('❌ 웹캠 벡터가 유효하지 않습니다:', webcamVector);
            vectorSendFailRef.current++;
            
            // 타임아웃이 발생했는데도 벡터가 없으면 기본 벡터로 전송 시도
            if (isTimedOut && currentSessionId) {
              console.log('🔄 타임아웃 발생, 기본 벡터로 전송 재시도...');
              const defaultVector = [0, 0, 1, 0, 0];
              try {
                await emotionAPI.pushWebcamVector(currentSessionId, defaultVector);
                vectorSendSuccessRef.current++;
                setFrameCount(prev => {
                  const newCount = prev + 1;
                  console.log(`✅ 타임아웃 후 기본 벡터 전송 성공 (총 ${newCount}회)`);
                  return newCount;
                });
              } catch (err) {
                console.error('❌ 타임아웃 후 기본 벡터 전송도 실패:', err);
              }
            }
          }
        } catch (error) {
          console.error('❌ 프레임 처리 중 오류:', error);
          analysisFailRef.current++;
          // 에러 발생 시에도 기본 벡터 사용
          if (!webcamVector) {
            webcamVector = [0, 0, 1, 0, 0]; // neutral
            console.log('🔄 에러 발생으로 기본 벡터(neutral) 사용');
          }
        } finally {
          // 타임아웃 타이머 정리
          if (analysisTimeoutId) {
            clearTimeout(analysisTimeoutId);
            analysisTimeoutId = null;
          }
          
          // isAnalyzing 확실히 리셋
          isAnalyzingRef.current = false;
          console.log('✅ 분석 완료, isAnalyzing 리셋됨');
        }
      }, 'image/jpeg', 0.8);
    } catch (error) {
      console.error('❌ 프레임 캡처 오류:', error);
      isAnalyzingRef.current = false;
    }
  };

  // 설문 시작 핸들러
  const handleStartSurvey = async () => {
    try {
      console.log('🚀 설문 시작 버튼 클릭됨');
      
      // 세션 시작
      console.log('📡 세션 시작 API 호출...');
      const sessionResponse = await emotionAPI.startSession();
      console.log('✅ 세션 시작 응답 받음:', sessionResponse);
      
      // 응답 구조 확인 및 안전하게 sessionId 추출
      let newSessionId;
      if (sessionResponse?.data?.sessionId) {
        newSessionId = sessionResponse.data.sessionId;
      } else if (sessionResponse?.sessionId) {
        newSessionId = sessionResponse.sessionId;
      } else if (typeof sessionResponse === 'string') {
        newSessionId = sessionResponse;
      } else {
        console.error('❌ 세션 응답 구조가 예상과 다릅니다:', sessionResponse);
        throw new Error('세션 ID를 받지 못했습니다. 응답: ' + JSON.stringify(sessionResponse));
      }
      
      console.log('✅ 추출된 세션 ID:', newSessionId);
      
      setSessionId(newSessionId);
      sessionIdRef.current = newSessionId;
      setIsRecording(true);
      isRecordingRef.current = true;
      console.log('🎬 세션 시작 완료:', {
        sessionId: newSessionId,
        isRecording: isRecordingRef.current
      });

      // 웹캠 시작
      await startWebcam();

      setIsSurveyStarted(true);

      // 비디오가 완전히 준비되고 재생될 때까지 대기
      const waitForVideoReady = () => {
        return new Promise((resolve, reject) => {
          let attempts = 0;
          const maxAttempts = 50; // 최대 5초 대기 (100ms * 50)
          
          const checkReady = () => {
            attempts++;
            const video = videoRef.current;
            
            if (!video) {
              if (attempts >= maxAttempts) {
                reject(new Error('비디오 요소가 없습니다.'));
                return;
              }
              setTimeout(checkReady, 100);
              return;
            }
            
            const isReady = video.readyState >= video.HAVE_ENOUGH_DATA && 
                           !video.paused && 
                           !video.ended &&
                           video.videoWidth > 0 &&
                           video.videoHeight > 0;
            
            console.log(`🔍 비디오 준비 상태 확인 (${attempts}/${maxAttempts}):`, {
              readyState: video.readyState,
              haveEnoughData: video.readyState >= video.HAVE_ENOUGH_DATA,
              paused: video.paused,
              ended: video.ended,
              videoSize: `${video.videoWidth}x${video.videoHeight}`,
              isReady
            });
            
            if (isReady) {
              console.log('✅ 비디오 완전히 준비됨, 첫 프레임 캡처 시작');
              resolve();
            } else if (attempts >= maxAttempts) {
              console.warn('⚠️ 비디오 준비 타임아웃, 강제로 진행합니다.');
              resolve(); // 타임아웃이어도 진행
            } else {
              setTimeout(checkReady, 100);
            }
          };
          
          checkReady();
        });
      };

      try {
        await waitForVideoReady();
        
        // 첫 프레임 캡처 즉시 실행 (비디오가 준비된 후)
        if (isRecordingRef.current && sessionIdRef.current) {
          console.log('🎬 첫 프레임 캡처 즉시 실행');
          
          // 여러 번 재시도하는 로직 추가
          let retryCount = 0;
          const maxRetries = 3;
          
          const tryCapture = () => {
            if (isRecordingRef.current && sessionIdRef.current) {
              captureAndAnalyze();
              retryCount++;
              
              // 첫 번째 시도 후 1초, 2초 후에도 재시도
              if (retryCount < maxRetries) {
                setTimeout(tryCapture, 1000 * retryCount);
              }
            } else {
              console.warn('⚠️ 첫 프레임 캡처 건너뜀 (세션 상태 변경됨)');
            }
          };
          
          // 약간의 지연을 두어 비디오가 안정화되도록 함
          setTimeout(tryCapture, 300);
        } else {
          console.warn('⚠️ 첫 프레임 캡처 건너뜀 (세션 상태 불일치)');
        }
      } catch (error) {
        console.error('❌ 비디오 준비 대기 실패:', error);
        // 에러가 발생해도 주기적 캡처는 계속 진행
      }

      // 주기적으로 프레임 캡처 및 분석 (3초마다로 단축)
      console.log('⏰ 주기적 프레임 캡처 인터벌 설정 (3초마다)');
      intervalRef.current = setInterval(() => {
        console.log('⏰ 주기적 프레임 캡처 타이머 실행', {
          isRecording: isRecordingRef.current,
          hasSessionId: !!sessionIdRef.current,
          hasVideo: !!videoRef.current,
          hasCanvas: !!canvasRef.current
        });
        
        if (isRecordingRef.current && sessionIdRef.current) {
          console.log('✅ 주기적 프레임 캡처 실행');
          captureAndAnalyze();
        } else {
          console.warn('⚠️ 주기적 프레임 캡처 건너뜀:', {
            isRecording: isRecordingRef.current,
            hasSessionId: !!sessionIdRef.current
          });
        }
      }, 3000);
      
      toast.success('설문이 시작되었습니다. 웹캠이 활성화되었습니다.');
    } catch (error) {
      console.error('설문 시작 오류:', error);
      toast.error('설문 시작에 실패했습니다.');
    }
  };

  // 설문 완료 핸들러 (SurveyForm에서 호출)
  const handleSurveyComplete = async (surveyData) => {
    const currentSessionId = sessionIdRef.current;
    
    console.log('📊 설문 완료 시점 통계:', {
      sessionId: currentSessionId,
      frameCount: frameCount,
      captureAttempts: captureAttemptsRef.current,
      captureSuccess: captureSuccessRef.current,
      analysisSuccess: analysisSuccessRef.current,
      analysisFail: analysisFailRef.current,
      vectorSendSuccess: vectorSendSuccessRef.current,
      vectorSendFail: vectorSendFailRef.current,
      isRecording: isRecordingRef.current
    });
    
    if (!currentSessionId) {
      console.error('❌ 세션 ID가 없습니다. 일반 설문 제출로 진행합니다.');
      // 세션 ID가 없으면 일반 설문 제출로 폴백
      try {
        const result = await surveyAPI.createSurvey(surveyData);
        console.log('✅ 설문 제출 완료:', result);
        toast.success('설문이 성공적으로 제출되었습니다!');
        setSessionId(null);
        setFrameCount(0);
        setIsSurveyStarted(false);
      } catch (error) {
        console.error('설문 제출 오류:', error);
        toast.error('설문 제출에 실패했습니다.');
      }
      return;
    }

    try {
      // 웹캠 데이터가 없으면 마지막으로 한 번 더 캡처 시도
      if (frameCount === 0) {
        console.warn('⚠️ 웹캠 데이터가 없습니다. 마지막 캡처 시도...');
        if (isRecordingRef.current && videoRef.current && canvasRef.current) {
          try {
            await captureAndAnalyze();
            // 캡처 완료를 기다림
            await new Promise(resolve => setTimeout(resolve, 2000));
          } catch (error) {
            console.error('❌ 마지막 캡처 시도 실패:', error);
          }
        }
      }
      
      // 웹캠 중지
      stopWebcam();
      setIsRecording(false);
      isRecordingRef.current = false;

      // 융합 수행
      console.log('🔄 데이터 융합 시작...', { 
        sessionId: currentSessionId,
        frameCount: frameCount,
        vectorSendSuccess: vectorSendSuccessRef.current
      });
      const fusionResult = await emotionAPI.fuseEmotionData(currentSessionId, surveyData);
      
      console.log('✅ 융합 완료:', fusionResult);
      
      // 융합 결과를 설문 데이터에 포함하여 저장
      const surveyDataWithEmotion = {
        ...surveyData,
        survey: fusionResult.data?.survey,
        expression: fusionResult.data?.expression,
        total: fusionResult.data?.total
      };
      
      // 설문 저장
      try {
        console.log('💾 설문 저장 시도 - 데이터:', {
          hasSurvey: !!surveyDataWithEmotion.survey,
          hasExpression: !!surveyDataWithEmotion.expression,
          hasTotal: !!surveyDataWithEmotion.total,
          survey: surveyDataWithEmotion.survey,
          expression: surveyDataWithEmotion.expression,
          total: surveyDataWithEmotion.total
        });
        const result = await surveyAPI.createSurvey(surveyDataWithEmotion);
        console.log('✅ 설문 저장 완료:', result);
        console.log('✅ 저장된 감정 데이터:', {
          hasSurvey: !!result.data?.survey,
          hasExpression: !!result.data?.expression,
          hasTotal: !!result.data?.total
        });
      } catch (submitError) {
        console.error('❌ 설문 저장 실패:', submitError);
        console.error('❌ 에러 상세:', {
          message: submitError.message,
          response: submitError.response?.data,
          status: submitError.response?.status
        });
        const errorMessage = submitError.response?.data?.error?.message || submitError.message || '설문 저장에 실패했습니다.';
        toast.error(`설문 저장 실패: ${errorMessage}`);
      }
      
      // 최종 감정 결과 표시
      if (fusionResult.data && fusionResult.data.total) {
        const { dominantEmotion } = fusionResult.data.total;
        const frameCount = fusionResult.data.frameCount || 0;
        
        toast.success(`감정 분석 완료! (프레임: ${frameCount}개)`);
        console.log('🎯 최종 감정 결과:', {
          emotion: dominantEmotion,
          survey: fusionResult.data.survey,
          expression: fusionResult.data.expression,
          total: fusionResult.data.total,
          frameCount: frameCount
        });
      } else {
        const frameCount = fusionResult.data?.frameCount || 0;
        toast.success(`융합 완료! ${frameCount}개 프레임이 처리되었습니다.`);
        console.log('⚠️ 최종 감정 결과가 없습니다:', fusionResult.data);
      }
      
      // 상태 초기화
      setSessionId(null);
      sessionIdRef.current = null;
      setFrameCount(0);
      setIsSurveyStarted(false);
    } catch (error) {
      console.error('❌ 융합 오류:', error);
      
      // 웹캠 데이터가 없는 경우 폴백 처리
      if (error.response?.status === 400 && error.response?.data?.error?.message?.includes('웹캠 데이터가 없습니다')) {
        console.log('⚠️ 웹캠 데이터가 없어 일반 설문 제출로 진행합니다.');
        console.log('📊 웹캠 데이터 상태:', {
          frameCount: frameCount,
          sessionId: currentSessionId,
          isRecording: isRecordingRef.current
        });
        
        try {
          const result = await surveyAPI.createSurvey(surveyData);
          console.log('✅ 설문 제출 완료:', result);
          toast.warning('웹캠 데이터가 없어 일반 설문으로 제출되었습니다. (프레임 캡처: ' + frameCount + '회)');
        } catch (submitError) {
          console.error('설문 제출 오류:', submitError);
          const submitErrorMessage = submitError.response?.data?.error?.message || '설문 제출에 실패했습니다.';
          toast.error(`설문 제출 실패: ${submitErrorMessage}`);
        }
      } else {
        const errorMessage = error.response?.data?.error?.message || error.message || '데이터 융합에 실패했습니다.';
        console.error('❌ 융합 오류 상세:', {
          status: error.response?.status,
          message: errorMessage,
          details: error.response?.data?.error?.details
        });
        toast.error(`데이터 융합 실패: ${errorMessage}`);
        
        // 융합 실패 시에도 설문 데이터는 저장 시도
        try {
          console.log('💾 융합 실패했지만 설문 데이터 저장 시도...');
          const result = await surveyAPI.createSurvey(surveyData);
          console.log('✅ 설문 데이터 저장 완료:', result);
        } catch (submitError) {
          console.error('❌ 설문 데이터 저장도 실패:', submitError);
        }
      }
      
      // 상태 초기화
      setSessionId(null);
      sessionIdRef.current = null;
      setFrameCount(0);
      setIsSurveyStarted(false);
    }
  };

  // 비디오 재생 상태 모니터링 및 자동 복구
  useEffect(() => {
    if (!isRecording || !isSurveyStarted) {
      return;
    }
    
    const videoMonitorInterval = setInterval(() => {
      const video = videoRef.current;
      if (!video || !isRecordingRef.current) {
        return;
      }
      
      // 비디오 상태 확인
      const isPaused = video.paused;
      const readyState = video.readyState;
      const hasStream = !!video.srcObject;
      
      // 문제가 있으면 로그 출력 및 복구 시도
      if (isPaused || readyState === 0 || !hasStream) {
        console.warn('⚠️ 비디오 상태 문제 감지:', {
          paused: isPaused,
          readyState: readyState,
          hasStream: hasStream,
          videoWidth: video.videoWidth,
          videoHeight: video.videoHeight
        });
        
        // paused 상태면 재생 시도
        if (isPaused && hasStream) {
          console.log('🔄 비디오 재생 복구 시도...');
          video.play().catch(err => {
            console.warn('⚠️ 비디오 재생 복구 실패:', err);
          });
        }
        
        // 스트림이 없으면 재연결 시도
        if (!hasStream && streamRef.current) {
          console.log('🔄 스트림 재연결 시도...');
          video.srcObject = streamRef.current;
          video.play().catch(err => {
            console.warn('⚠️ 스트림 재연결 실패:', err);
          });
        }
      }
    }, 1000); // 1초마다 확인
    
    return () => {
      clearInterval(videoMonitorInterval);
    };
  }, [isRecording, isSurveyStarted]);

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      stopWebcam();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <PageContainer>
      <PageHeader
        icon="📋"
        title={t('AnalyzePage.title')} 
        subtitle={t('AnalyzePage.subtitle')}
      />
      {isSurveyStarted ? (
        <>
          <Video ref={videoRef} autoPlay playsInline muted />
          <Canvas ref={canvasRef} />
          <SurveyForm 
            sessionId={sessionId}
            onSurveyComplete={handleSurveyComplete}
          />
          {isRecording && (
            <StatusText>
              🎥 웹캠 녹화 중... (분석 횟수: {frameCount}회)
            </StatusText>
          )}
        </>
      ) : (
        <StartContainer>
          <StartButton onClick={handleStartSurvey}>
            {t('AnalyzePage.survaystart')}
          </StartButton>
        </StartContainer>
      )}
    </PageContainer>
  );
}

export default AnalyzePage;
