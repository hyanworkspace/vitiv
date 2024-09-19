import React, { useState, useRef, useEffect } from 'react';

function VideoRecorder() {
    const [isRecording, setIsRecording] = useState(false); // 记录是否正在录制
    const [videoURL, setVideoURL] = useState(null); // 存储录制后的视频 URL
    const [chatMessage, setChatMessage] = useState(''); // 聊天消息
    const [generateVideo, setGenerateVideo] = useState(false); // 是否生成视频
    const [screenshot, setScreenshot] = useState(null); // 存储截图
    const [screenshotTime, setScreenshotTime] = useState(''); // 存储截图时刻信息
    const mediaRecorderRef = useRef(null); // 引用媒体录制器
    const videoRef = useRef(null); // 引用摄像头视频元素
    const playbackRef = useRef(null); // 引用播放录制视频的元素
    const streamRef = useRef(null); // 引用视频流

    const startRecording = async () => {
        console.log('请求摄像头权限...'); // 调试信息
        const stream = await navigator.mediaDevices.getUserMedia({ video: true }); // 获取摄像头视频流
        streamRef.current = stream; // 保存视频流

        // 尝试使用 video/mp4 格式
        const options = { mimeType: 'video/mp4' };
        mediaRecorderRef.current = new MediaRecorder(stream, options); // 创建媒体录制器
        const chunks = []; // 存储录制的片段

        mediaRecorderRef.current.ondataavailable = (event) => {
            if (event.data.size > 0) {
                chunks.push(event.data); // 收集录制的数据
                console.log('录制数据可用，大小:', event.data.size); // 调试信息
            }
        };

        mediaRecorderRef.current.onstop = () => {
            console.log('录制结束，生成 Blob'); // 调试信息
            const blob = new Blob(chunks, { type: 'video/mp4' }); // 创建视频 Blob
            const url = URL.createObjectURL(blob); // 创建视频 URL
            setVideoURL(url); // 更新视频 URL 状态
            console.log('生成的视频 URL:', url); // 调试信息
        };

        mediaRecorderRef.current.start(); // 开始录制
        setIsRecording(true); // 更新录制状态
        console.log('开始录制'); // 调试信息

        // 将视频流赋值给摄像头视频元素
        if (videoRef.current) {
            videoRef.current.srcObject = stream; // 显示实时视频流
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) { // 确保 mediaRecorderRef.current 不为 null
            mediaRecorderRef.current.stop(); // 停止录制
            setIsRecording(false); // 更新录制状态
            console.log('停止录制'); // 调试信息
        }
    };

    const handleChatMessageChange = (event) => {
        setChatMessage(event.target.value); // 更新聊天消息
    };

    const handleGenerateVideo = () => {
        setGenerateVideo(!generateVideo); // 切换生成视频状态
        console.log('生成视频:', !generateVideo); // 调试信息
    };

    const captureScreenshot = () => {
        if (playbackRef.current) { // 使用播放录制视频的元素
            const canvas = document.createElement('canvas'); // 创建一个画布
            const context = canvas.getContext('2d'); // 获取画布的上下文
            canvas.width = playbackRef.current.videoWidth; // 设置画布宽度
            canvas.height = playbackRef.current.videoHeight; // 设置画布高度
            context.drawImage(playbackRef.current, 0, 0, canvas.width, canvas.height); // 将视频当前帧绘制到画布上
            const imageURL = canvas.toDataURL('image/png'); // 将画布转换为图片 URL
            setScreenshot(imageURL); // 更新截图状态
            setScreenshotTime(playbackRef.current.currentTime.toFixed(2)); // 更新截图时刻信息
            console.log('截图已捕获'); // 调试信息
        }
    };

    useEffect(() => {
        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop()); // 停止所有视频流
            }
        };
    }, []); // 组件卸载时停止视频流

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <video ref={videoRef} autoPlay muted style={{ width: '100%', maxWidth: '600px' }} /> {/* 显示摄像头视频流 */}
            <button onClick={isRecording ? stopRecording : startRecording} style={{ fontSize: '24px' }}>
                {isRecording ? '⏸️' : '🔴'} {/* 更改按钮图标 */}
            </button>
            {videoURL && (
                <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <video ref={playbackRef} src={videoURL} controls style={{ width: '100%', maxWidth: '600px' }} /> {/* 播放录制的视频 */}
                    <p>视频 URL: {videoURL}</p> {/* 打印视频 URL */}
                    <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <h2>聊天消息：</h2>
                        <textarea
                            value={chatMessage}
                            onChange={handleChatMessageChange}
                            placeholder="输入聊天消息..."
                            rows={5}
                            cols={30}
                        />
                        <div>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={generateVideo}
                                    onChange={handleGenerateVideo}
                                />
                                生成视频
                            </label>
                        </div>
                        <button onClick={() => console.log('开始生成视频')}>开始</button>
                        <button onClick={captureScreenshot}>捕获当前画面</button> {/* 捕获按钮 */}
                        {screenshot && (
                            <div>
                                <h3>截图：</h3>
                                <img src={screenshot} alt="Screenshot" style={{ width: '300px' }} /> {/* 显示截图 */}
                                <p>截图时刻: {screenshotTime} 秒</p> {/* 显示截图时刻信息 */}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default VideoRecorder;
