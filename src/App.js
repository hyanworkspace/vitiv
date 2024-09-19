import React from 'react';
import VideoRecorder from './components/VideoRecorder';

function App() {
  return (
    <div>
      <h2>What's in your eyes?</h2>
      <VideoRecorder /> {/* 引入视频录制组件 */}
    </div>
  );
}

export default App;
