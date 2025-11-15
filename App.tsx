
import React, { useState, useMemo } from 'react';
import { Step } from './types';
import { CheckIcon, XIcon } from './components/icons';

interface BarModelProps {
  step: Step;
  onCorrectSegmentClick: () => void;
  isSegmentClickable: boolean;
}

const BarModel: React.FC<BarModelProps> = ({ step, onCorrectSegmentClick, isSegmentClickable }) => {
  const showValue = step >= Step.CALC_PART_1;

  return (
    <div className="w-full max-w-2xl mx-auto my-4 text-center select-none">
      {/* Total Salary Bar */}
      <div className="mb-8">
        <p className="text-lg font-semibold text-gray-700 mb-2">全部薪水 (基準量)</p>
        <div className="relative h-12 flex rounded-md overflow-hidden border-2 border-gray-800">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className={`flex-1 ${i === 0 ? 'bg-blue-300' : 'bg-gray-200'} border-r border-gray-500`}></div>
          ))}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-bold text-gray-900 bg-white/50 px-2 py-1 rounded">100%</span>
          </div>
        </div>
      </div>

      {/* Savings Bar */}
      <div>
        <p className="text-lg font-semibold text-gray-700 mb-2">存入銀行的錢</p>
        <div className="relative h-12 flex rounded-md overflow-hidden border-2 border-blue-600 bg-blue-300 w-[20%]">
          {isSegmentClickable ? (
            <button
              onClick={onCorrectSegmentClick}
              className="absolute inset-0 flex items-center justify-center w-full h-full cursor-pointer hover:bg-yellow-300/80 transition-colors duration-200"
              aria-label="點擊此處標示7500元"
            >
              <span className="text-xl font-bold text-blue-800 bg-white/50 px-2 py-1 rounded">20%</span>
            </button>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-bold text-blue-800 bg-white/50 px-2 py-1 rounded">20%</span>
            </div>
          )}
          {showValue && (
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-lg font-bold text-green-600 whitespace-nowrap">
              <span className="animate-pulse">↓</span> 7500 元
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


const App: React.FC = () => {
  const [step, setStep] = useState<Step>(Step.SELECT_BASE);
  const [baseSelection, setBaseSelection] = useState<'salary' | 'savings' | null>(null);
  const [isBaseCorrect, setIsBaseCorrect] = useState<boolean | null>(null);
  
  const [isLabelCorrect, setIsLabelCorrect] = useState<boolean | null>(null);

  const [calc1Input, setCalc1Input] = useState('');
  const [isCalc1Correct, setIsCalc1Correct] = useState<boolean | null>(null);
  
  const [calc2Input, setCalc2Input] = useState('');
  const [isCalc2Correct, setIsCalc2Correct] = useState<boolean | null>(null);

  const [shake, setShake] = useState(false);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const handleBaseSelection = (selection: 'salary' | 'savings') => {
    setBaseSelection(selection);
    if (selection === 'salary') {
      setIsBaseCorrect(true);
      setTimeout(() => setStep(Step.LABEL_VALUE), 1000);
    } else {
      setIsBaseCorrect(false);
      triggerShake();
    }
  };

  const handleCorrectSegmentClick = () => {
    setIsLabelCorrect(true);
    setTimeout(() => setStep(Step.CALC_PART_1), 1000);
  };
  
  const handleCalc1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (calc1Input.trim() === '3750') {
      setIsCalc1Correct(true);
      setTimeout(() => setStep(Step.CALC_PART_2), 1000);
    } else {
      setIsCalc1Correct(false);
      triggerShake();
    }
  };

  const handleCalc2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (calc2Input.trim() === '37500') {
      setIsCalc2Correct(true);
      setTimeout(() => setStep(Step.SUMMARY), 1000);
    } else {
      setIsCalc2Correct(false);
      triggerShake();
    }
  };

  const reset = () => {
    setStep(Step.SELECT_BASE);
    setBaseSelection(null);
    setIsBaseCorrect(null);
    setIsLabelCorrect(null);
    setCalc1Input('');
    setIsCalc1Correct(null);
    setCalc2Input('');
    setIsCalc2Correct(null);
  };

  const problemText = "阿姨每個月會將薪水的二成存入銀行，阿姨這個月存了 7500 元，她這個月的薪水是多少元？";

  const renderContent = () => {
    switch (step) {
      case Step.SELECT_BASE:
        return (
          <>
            <h2 className="text-xl font-bold text-gray-800 mb-4">步驟 1: 找出基準量</h2>
            <p className="text-lg text-gray-700 mb-6">誰是基準量 (1 或 100%)？</p>
            <div className={`flex flex-col sm:flex-row gap-4 justify-center ${shake ? 'animate-shake' : ''}`}>
              <button
                onClick={() => handleBaseSelection('salary')}
                className={`w-full sm:w-40 text-lg font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                  baseSelection === 'salary' 
                    ? (isBaseCorrect ? 'bg-green-500 text-white shadow-lg' : '')
                    : 'bg-white text-blue-600 shadow-md hover:bg-blue-50'
                }`}
              >
                阿姨的薪水
              </button>
              <button
                onClick={() => handleBaseSelection('savings')}
                className={`w-full sm:w-40 text-lg font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                  baseSelection === 'savings'
                    ? (isBaseCorrect === false ? 'bg-red-500 text-white shadow-lg' : '')
                    : 'bg-white text-blue-600 shadow-md hover:bg-blue-50'
                }`}
              >
                存入的錢
              </button>
            </div>
            {isBaseCorrect === true && (
              <div className="mt-6 text-green-600 font-semibold flex items-center justify-center gap-2">
                <CheckIcon /> 答對了！「薪水」是全部，所以是基準量。
              </div>
            )}
            {isBaseCorrect === false && (
              <div className="mt-6 text-red-600 font-semibold flex items-center justify-center gap-2">
                <XIcon /> 不對喔！再想一想，哪個是全部的量？
              </div>
            )}
          </>
        );
      case Step.LABEL_VALUE:
        return (
          <>
            <h2 className="text-xl font-bold text-gray-800 mb-2">步驟 2: 建立線段圖 & 標示已知金額</h2>
            <p className="text-lg text-gray-700 mb-6">題目中的「7500 元」是指圖上的哪一段？請點擊線段圖上的正確區塊。</p>
            <BarModel step={step} onCorrectSegmentClick={handleCorrectSegmentClick} isSegmentClickable={true} />
            {isLabelCorrect && (
               <div className="mt-16 text-green-600 font-semibold flex items-center justify-center gap-2 text-lg">
                <CheckIcon /> 太棒了！「20%」的存款就是 7500 元。
              </div>
            )}
          </>
        );
      case Step.CALC_PART_1:
        return (
           <>
            <h2 className="text-xl font-bold text-gray-800 mb-2">步驟 3: 拆解計算 (第一步)</h2>
            <BarModel step={step} onCorrectSegmentClick={() => {}} isSegmentClickable={false} />
            <p className="text-lg text-gray-700 mt-16 mb-4">
              薪水的「二成」就是 10 份裡的 2 份。既然 <span className="font-bold text-blue-600">2 份是 7500 元</span>，那 <span className="font-bold text-purple-600">1 份</span> 是多少？
            </p>
            <form onSubmit={handleCalc1Submit} className={`mt-4 p-4 rounded-lg bg-gray-100 ${shake ? 'animate-shake' : ''}`}>
              <label htmlFor="calc1" className="text-lg font-mono text-gray-800">7500 ÷ 2 =</label>
              <input 
                id="calc1"
                type="number"
                value={calc1Input}
                onChange={(e) => setCalc1Input(e.target.value)}
                className={`w-32 ml-2 text-lg p-2 border-2 rounded-md transition-colors duration-300 text-center ${
                  isCalc1Correct === true ? 'border-green-500 bg-green-100' : 
                  isCalc1Correct === false ? 'border-red-500 bg-red-100' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                }`}
                autoFocus
              />
              <button type="submit" className="ml-4 bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300">確認</button>
              {isCalc1Correct === false && <p className="text-red-500 mt-2">答案不對喔，請再試一次！</p>}
            </form>
            {isCalc1Correct && (
              <div className="mt-4 text-green-600 font-semibold flex items-center justify-center gap-2 text-lg">
                <CheckIcon /> 正確！1 份是 3750 元。
              </div>
            )}
          </>
        );
      case Step.CALC_PART_2:
         return (
           <>
            <h2 className="text-xl font-bold text-gray-800 mb-2">步驟 4: 拆解計算 (第二步)</h2>
            <BarModel step={step} onCorrectSegmentClick={() => {}} isSegmentClickable={false} />
            <p className="text-lg text-gray-700 mt-16 mb-4">
              既然 <span className="font-bold text-purple-600">1 份是 3750 元</span>，那 <span className="font-bold text-gray-800">全部的薪水 (10 份)</span> 是多少？
            </p>
            <form onSubmit={handleCalc2Submit} className={`mt-4 p-4 rounded-lg bg-gray-100 ${shake ? 'animate-shake' : ''}`}>
              <label htmlFor="calc2" className="text-lg font-mono text-gray-800">3750 × 10 =</label>
              <input 
                id="calc2"
                type="number"
                value={calc2Input}
                onChange={(e) => setCalc2Input(e.target.value)}
                className={`w-40 ml-2 text-lg p-2 border-2 rounded-md transition-colors duration-300 text-center ${
                  isCalc2Correct === true ? 'border-green-500 bg-green-100' : 
                  isCalc2Correct === false ? 'border-red-500 bg-red-100' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                }`}
                autoFocus
              />
              <button type="submit" className="ml-4 bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300">確認</button>
              {isCalc2Correct === false && <p className="text-red-500 mt-2">答案不對喔，請再試一次！</p>}
            </form>
            {isCalc2Correct && (
              <div className="mt-4 text-green-600 font-semibold flex items-center justify-center gap-2 text-lg">
                <CheckIcon /> 答對了！我們算出總薪水了！
              </div>
            )}
          </>
        );
      case Step.SUMMARY:
        return (
          <div className="text-left w-full">
            <h2 className="text-2xl font-bold text-green-600 mb-6 text-center">恭喜你，完成作答！</h2>
            <BarModel step={step} onCorrectSegmentClick={() => {}} isSegmentClickable={false} />
            <div className="mt-16 bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">完整計算過程：</h3>
              <ul className="space-y-3 text-lg text-gray-700 list-disc list-inside">
                <li>「二成」是 20%，也就是 <span className="font-semibold text-blue-600">10 份中的 2 份</span>。</li>
                <li>已知 <span className="font-semibold text-blue-600">2 份</span> 的存款是 <span className="font-semibold text-blue-600">7500 元</span>。</li>
                <li>計算 <span className="font-semibold text-purple-600">1 份</span> 是多少：<br/><span className="ml-6 font-mono">7500 ÷ 2 = 3750 元</span></li>
                <li>計算 <span className="font-semibold text-gray-800">全部薪水 (10 份)</span> 是多少：<br/><span className="ml-6 font-mono">3750 × 10 = 37500 元</span></li>
              </ul>
            </div>
            <div className="mt-6 text-center text-2xl font-bold bg-yellow-200 text-yellow-900 p-4 rounded-lg">
              答案：阿姨這個月的薪水是 37500 元。
            </div>
            <div className="text-center mt-8">
              <button onClick={reset} className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 transition-colors duration-300 text-lg">
                再做一次
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const progressPercentage = useMemo(() => {
    const stepValues = Object.values(Step).filter(v => typeof v === 'number') as number[];
    const currentStepIndex = stepValues.indexOf(step);
    // Add 1 to currentStepIndex to make it 1-based, and 1 to length for the final state
    return ((currentStepIndex + 1) / (stepValues.length + 1)) * 100;
  }, [step]);

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans">
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-6 sm:p-10 transform transition-all duration-500">
        <header className="text-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            引導式線段圖解題
          </h1>
          <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
            <p className="text-lg text-gray-800 text-left leading-relaxed">{problemText}</p>
          </div>
        </header>

        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-green-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
        </div>

        <main className="text-center min-h-[300px] flex flex-col items-center justify-center">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
