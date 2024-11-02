const targetElement = document.querySelector('.biz-right-bar');
function getRandomTime() {
  const min = 8000; // 最小值
  const max = 12000; // 最大值
  const randomTime = Math.random() * (max - min) + min; // 计算随机时间
  return randomTime; // 返回随机时间
}

// 使用示例
const randomTimeInSeconds = getRandomTime();
function testConsole(){
    console.log("test now")
}
if (targetElement) {
    targetElement.insertAdjacentHTML('beforebegin', `
        <div id="customButton" style="margin-top: 30px; width:200px; cursor: pointer; color: gray; text-align: center;">_____</div>
    `);

    const button = document.getElementById('customButton');
    button.addEventListener('click', () => {
        if (document.getElementById('popupContainer')) return;

        const popupContainer = document.createElement('div');
        popupContainer.id = 'popupContainer';
        Object.assign(popupContainer.style, {
            position: 'fixed',
            justifyContent: 'space-between',
            alignItems: 'center',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '10px',
            backgroundColor: 'white',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            zIndex: '1000',
            width: '700px',
            borderRadius: '8px'
        });

        popupContainer.innerHTML = `
            <h3>fetchCode</h3>
            <div style="display: flex;">
                <textarea id="popupTextarea" rows="4" style="width: 250px; margin-bottom: 10px;"></textarea>
                <button id="executeBtn" style="font-size: 20px; margin-left: 10px; cursor: pointer; width: 80px; height: 60px; margin-right: 10px; border: none; background-color: #5475e7; color: #fff;">run</button>
                <div style="display: flex; justify-content: center; align-items: center;">
                    <p>Count：</p> 
                    <input type="number" id="loopCount" min="1" value="1" style="cursor: pointer; width: 60px; font-size: 25px; border-radius: 5px; margin: 20px;">
                </div>
                <button id="stopBtn" style="font-size: 20px; width: 80px; cursor: pointer; height: 60px; margin-right: 10px; border: none; background-color: #e75454; color: #fff;">stop</button>
                <button id="closeBtn" style="font-size: 20px; width: 80px; cursor: pointer; height: 60px; margin-right: 10px; border: none; background-color: #e7a754; color: #fff;">close</button>
            </div>
        `;
        document.body.appendChild(popupContainer);

        // 按钮引用
        const executeBtn = document.getElementById('executeBtn');
        const stopBtn = document.getElementById('stopBtn');
        const closeBtn = document.getElementById('closeBtn');
        
        let intervalId;
        let successfulCount = 0;

        // 启动和停止代码的函数
        const toggleExecution = (start = true) => {
            executeBtn.disabled = !start;
            executeBtn.style.cursor = start ? "pointer" : "not-allowed";
        };

        const resetExecution = () => {
            clearInterval(intervalId);
            toggleExecution(true);
            alert('fetch执行已完成');
        };

        // 执行按钮事件，设置循环执行
        executeBtn.addEventListener('click', () => {
            const code = document.getElementById('popupTextarea').value;
            const codeFunction = new Function(code);
            toggleExecution(false);

            let executionCount = 0;
            const loopCount = parseInt(document.getElementById('loopCount').value, 10);

            intervalId = setInterval(() => {
                if (executionCount < loopCount) {
                    try {
                        codeFunction();
                        successfulCount++;
                        executionCount++;
                        popupContainer.querySelector('h3').innerText = `fetchCode - 执行次数：${successfulCount}`;
                    } catch (error) {
                        console.error(`fetch出错: ${error.message}`);
                    }
                } else {
                    resetExecution();
                }
            }, randomTimeInSeconds);
        });

        // 停止按钮事件
        stopBtn.addEventListener('click', () => {
            clearInterval(intervalId);
            alert('fetch已停止');
            toggleExecution(true);
        });

        // 关闭按钮事件
        closeBtn.addEventListener('click', () => {
            clearInterval(intervalId);
            document.body.removeChild(popupContainer);
            toggleExecution(true);
        });
    });
} else {
    console.error('找不到元素');
}
