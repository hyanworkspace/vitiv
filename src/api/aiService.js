const apiUrl = 'https://your-ai-api-endpoint.com'; // AI API 的 URL

export const sendVideoFrame = async (frame, prompt) => {
    const response = await fetch(`${apiUrl}/process`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ frame, prompt }), // 发送视频帧和提示
    });
    return response.json(); // 返回 API 响应
};
