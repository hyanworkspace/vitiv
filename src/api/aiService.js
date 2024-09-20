const apiUrl = 'https://open.bigmodel.cn/api/paas/v4/videos/generations'; // 更新为智谱的 API URL

export const startVideoGeneration = async (model, text, imageUrl, requestId, userId) => {
    const generatedRequest = await sendVideoFrame(model, text, imageUrl, requestId, userId); // 开始生成视频
    
    if (generatedRequest.task_status === "PROCESSING") {
        console.log('视频Id:', generatedRequest);
        // 开始轮询视频状态
        let status;
        do {
            await new Promise(resolve => setTimeout(resolve, 5000)); // 每 5 秒检查一次
            status = await checkVideoStatus(generatedRequest.id); // 查询状态
            console.log('视频状态:', status.task_status); // 显示当前状态
        } while (status.task_status === 'PROCESSING'); // 使用大写的 task_status 进行判断

        if (status.task_status === 'SUCCESS') { // 使用大写的状态
            console.log('视频生成完成，视频链接:', status.videoUrl); // 显示生成的视频链接
            return status; // 返回生成的视频链接
        } else {
            throw new Error('视频生成失败'); // 处理失败情况
        }
    } else {
        if (generatedRequest.task_status === 'SUCCESS') { // 使用大写的状态
            console.log('视频生成完成，视频链接:', generatedRequest.videoUrl); // 显示生成的视频链接
            return generatedRequest; // 返回生成的视频链接
        } else {
            throw new Error('视频生成失败'); // 处理失败情况
        }
    }
};

export const sendVideoFrame = async (model, text, imageUrl, requestId, userId) => {
    const body = {
        model,
        prompt: text,
        image_url: imageUrl,
        requestId: requestId, 
        userId: userId
    };
    const apiKey = process.env.REACT_APP_API_KEY;

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify(body),
    });
    const result = await response.json(); // 获取初始响应

    if (result.task_status === 'SUCCESS') { //  如果成功
        // 直接返回视频
        console.log('成功结果：', result.id, result.task_status)
        // return result; 
    }
    console.log('未成功结果：', result.id)
    return result; // 默认返回请求 ID 以供后续轮询使用
};

// 添加状态检查函数
export const checkVideoStatus = async (requestId) => {
    const statusUrl = `https://open.bigmodel.cn/api/paas/v4/async-result/${requestId}`;
    const apiKey = process.env.REACT_APP_API_KEY;

    const response = await fetch(statusUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
        },
    });
    
    const result = await response.json(); // 获取状态响应
    // 确保返回的结果包含 task_status
    if (!result || !result.task_status) {
        throw new Error('无法获取视频处理状态'); // 抛出错误
    }
    
    return result; // 返回状态响应
};

