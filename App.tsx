
import React, { useState, useMemo } from 'react';
import { Step, Problem } from './types';
import { CheckIcon, XIcon } from './components/icons';

const problems: Problem[] = [
  {
    id: 1,
    text: "阿姨每個月會將薪水的二成存入銀行，阿姨這個月存了 7500 元，她這個月的薪水是多少元？",
    unit: "元",
    baseKey: "salary",
    baseOptions: { salary: "阿姨的薪水", savings: "存入的錢" },
    baseCorrectFeedback: "答對了！「薪水」是全部，所以是基準量。",
    baseIncorrectFeedback: "不對喔！再想一想，哪個是全部的量？",
    baseDescription: "全部薪水 (基準量)",
    comparisonDescription: "存入銀行的錢",
    totalParts: 5,
    comparisonParts: 1,
    knownValue: 7500,
    calculationSteps: [
      {
        promptHTML: `薪水的「二成」是 20%，也就是 <span class="font-bold text-blue-600">5 份裡的 1 份</span>。既然 <span class="font-bold text-blue-600">1 份是 7500 元</span>，那 <span class="font-bold text-gray-800">全部的薪水 (5 份)</span> 是多少？`,
        formulaPrefix: "7500 × 5 =",
        answer: "37500",
        correctFeedback: "正確！我們算出總薪水了！",
      },
    ],
    summary: {
      title: "恭喜你，完成作答！",
      stepsHTML: [
        `「二成」是 20%，也就是 <span class="font-semibold text-blue-600">5 份中的 1 份</span>。`,
        `已知 <span class="font-semibold text-blue-600">1 份</span> 的存款是 <span class="font-semibold text-blue-600">7500 元</span>。`,
        `計算 <span class="font-semibold text-gray-800">全部薪水 (5 份)</span> 是多少：<br/><span class="ml-6 font-mono">7500 × 5 = 37500 元</span>`,
      ],
      finalAnswer: (val) => `答案：阿姨這個月的薪水是 ${val} 元。`,
    },
  },
  {
    id: 2,
    text: "一條繩子用掉 75% 後，剩下 30 公分，這條繩子原來有多長？",
    unit: "公分",
    baseKey: "originalLength",
    baseOptions: { originalLength: "原來的長度", remainingLength: "剩下的長度" },
    baseCorrectFeedback: "答對了！「原來的長度」是全部，所以是基準量。",
    baseIncorrectFeedback: "不對喔！「剩下的長度」只是其中一部分。",
    baseDescription: "繩子原長 (基準量)",
    comparisonDescription: "剩下的長度",
    totalParts: 4,
    comparisonParts: 1,
    knownValue: 30,
    calculationSteps: [
       {
        promptHTML: `用掉 75% 表示剩下 25%，也就是 <span class="font-bold text-blue-600">4 份中的 1 份</span>。既然 <span class="font-bold text-blue-600">1 份是 30 公分</span>，那 <span class="font-bold text-gray-800">全部的繩長 (4 份)</span> 是多少？`,
        formulaPrefix: "30 × 4 =",
        answer: "120",
        correctFeedback: "正確！這樣就算出繩子原來的長度了！",
      },
    ],
    summary: {
      title: "恭喜你，完成作答！",
      stepsHTML: [
        `用掉 75%，表示剩下 100% - 75% = 25%，也就是 <span class="font-semibold text-blue-600">4 份中的 1 份</span>。`,
        `已知 <span class="font-semibold text-blue-600">剩下的 1 份</span> 是 <span class="font-semibold text-blue-600">30 公分</span>。`,
        `計算 <span class="font-semibold text-gray-800">繩子原長 (4 份)</span> 是多少：<br/><span class="ml-6 font-mono">30 × 4 = 120 公分</span>`,
      ],
      finalAnswer: (val) => `答案：這條繩子原來有 ${val} 公分。`,
    },
  },
  {
    id: 3,
    text: "一件外套打七五折後，售價是 1500 元，請問這件外套的原價是多少元？",
    unit: "元",
    baseKey: "originalPrice",
    baseOptions: { originalPrice: "原價", salePrice: "售價" },
    baseCorrectFeedback: "沒錯！「原價」是全部，所以是基準量。",
    baseIncorrectFeedback: "不對喔！「售價」是打折後的部分價格。",
    baseDescription: "原價 (基準量)",
    comparisonDescription: "售價",
    totalParts: 4,
    comparisonParts: 3,
    knownValue: 1500,
    calculationSteps: [
      {
        promptHTML: `「七五折」是 75%，也就是 <span class="font-bold text-blue-600">4 份裡的 3 份</span>。售價 1500 元是 3 份，那 <span class="font-bold text-purple-600">1 份</span> 是多少？`,
        formulaPrefix: "1500 ÷ 3 =",
        answer: "500",
        correctFeedback: "太棒了！你算出每 1 份代表多少錢了！",
      },
      {
        promptHTML: `既然 <span class="font-bold text-purple-600">1 份是 500 元</span>，那 <span class="font-bold text-gray-800">原價 (全部 4 份)</span> 是多少？`,
        formulaPrefix: "500 × 4 =",
        answer: "2000",
        correctFeedback: "正確！這樣就算出原價了！",
      }
    ],
    summary: {
      title: "恭喜你，完成作答！",
      stepsHTML: [
        `「七五折」是 75%，等於 <span class="font-semibold text-blue-600">4 份中的 3 份</span>。`,
        `已知 <span class="font-semibold text-blue-600">售價 (3 份)</span> 是 <span class="font-semibold text-blue-600">1500 元</span>。`,
        `先算 <span class="font-semibold text-purple-600">1 份</span> 是多少：<br/><span class="ml-6 font-mono">1500 ÷ 3 = 500 元</span>`,
        `再算 <span class="font-semibold text-gray-800">原價 (全部 4 份)</span>：<br/><span class="ml-6 font-mono">500 × 4 = 2000 元</span>`,
      ],
      finalAnswer: (val) => `答案：這件外套的原價是 ${val} 元。`,
    },
  },
  {
    id: 4,
    text: "某產品今年的產量比去年增加了 25%，今年的產量是 5000 個，去年的產量是多少個？",
    unit: "個",
    baseKey: "lastYearProduction",
    baseOptions: { lastYearProduction: "去年的產量", thisYearProduction: "今年的產量" },
    baseCorrectFeedback: "答對了！「去年的產量」是比較的基礎，所以是基準量。",
    baseIncorrectFeedback: "不對喔！「今年的產量」是增加後的結果。",
    baseDescription: "去年的產量 (基準量)",
    comparisonDescription: "今年的產量",
    totalParts: 4,
    comparisonParts: 5,
    knownValue: 5000,
    calculationSteps: [
      {
        promptHTML: `比去年增加 25%，表示今年產量是去年的 125%，也就是 <span class="font-bold text-blue-600">5 份</span> (去年是 4 份)。今年產量 5000 個是 5 份，那 <span class="font-bold text-purple-600">1 份</span> 是多少？`,
        formulaPrefix: "5000 ÷ 5 =",
        answer: "1000",
        correctFeedback: "很好！你算出每 1 份代表多少個了！",
      },
      {
        promptHTML: `既然 <span class="font-bold text-purple-600">1 份是 1000 個</span>，那 <span class="font-bold text-gray-800">去年的產量 (4 份)</span> 是多少？`,
        formulaPrefix: "1000 × 4 =",
        answer: "4000",
        correctFeedback: "正確！這樣就算出去年的產量了！",
      }
    ],
    summary: {
      title: "恭喜你，完成作答！",
      stepsHTML: [
        `增加 25% 表示今年的產量是去年的 100% + 25% = 125%，也就是 <span class="font-semibold text-blue-600">去年的 4 份，今年變 5 份</span>。`,
        `已知 <span class="font-semibold text-blue-600">今年的產量 (5 份)</span> 是 <span class="font-semibold text-blue-600">5000 個</span>。`,
        `先算 <span class="font-semibold text-purple-600">1 份</span> 是多少：<br/><span class="ml-6 font-mono">5000 ÷ 5 = 1000 個</span>`,
        `再算 <span class="font-semibold text-gray-800">去年的產量 (4 份)</span>：<br/><span class="ml-6 font-mono">1000 × 4 = 4000 個</span>`,
      ],
      finalAnswer: (val) => `答案：去年的產量是 ${val} 個。`,
    },
  },
  {
    id: 5,
    text: "一桶果汁喝掉了 3/8 後，還剩下 600 毫升，這桶果汁原來有多少毫升？",
    unit: "毫升",
    baseKey: "originalVolume",
    baseOptions: { originalVolume: "原來的容量", remainingVolume: "剩下的容量" },
    baseCorrectFeedback: "正確！「原來的容量」是全部，所以是基準量。",
    baseIncorrectFeedback: "不對喔！「剩下的容量」只是其中一部分。",
    baseDescription: "原來的容量 (基準量)",
    comparisonDescription: "剩下的容量",
    totalParts: 8,
    comparisonParts: 5,
    knownValue: 600,
    calculationSteps: [
      {
        promptHTML: `喝掉 3/8，表示剩下 5/8，也就是 <span class="font-bold text-blue-600">8 份裡的 5 份</span>。剩下 600 毫升是 5 份，那 <span class="font-bold text-purple-600">1 份</span> 是多少？`,
        formulaPrefix: "600 ÷ 5 =",
        answer: "120",
        correctFeedback: "做得好！你算出每 1 份代表多少了！",
      },
      {
        promptHTML: `既然 <span class="font-bold text-purple-600">1 份是 120 毫升</span>，那 <span class="font-bold text-gray-800">原來的容量 (全部 8 份)</span> 是多少？`,
        formulaPrefix: "120 × 8 =",
        answer: "960",
        correctFeedback: "正確！成功算出原來的容量！",
      }
    ],
    summary: {
      title: "恭喜你，完成作答！",
      stepsHTML: [
        `喝掉 3/8，表示剩下 1 - 3/8 = 5/8，也就是 <span class="font-semibold text-blue-600">8 份中的 5 份</span>。`,
        `已知 <span class="font-semibold text-blue-600">剩下的容量 (5 份)</span> 是 <span class="font-semibold text-blue-600">600 毫升</span>。`,
        `先算 <span class="font-semibold text-purple-600">1 份</span> 是多少：<br/><span class="ml-6 font-mono">600 ÷ 5 = 120 毫升</span>`,
        `再算 <span class="font-semibold text-gray-800">原來的容量 (全部 8 份)</span>：<br/><span class="ml-6 font-mono">120 × 8 = 960 毫升</span>`,
      ],
      finalAnswer: (val) => `答案：這桶果汁原來有 ${val} 毫升。`,
    },
  },
  {
    id: 6,
    text: "參加馬拉松比賽的選手中，有 40% 是女性，已知女性選手有 240 人，請問全部有多少選手？",
    unit: "人",
    baseKey: "totalRunners",
    baseOptions: { totalRunners: "全部選手", femaleRunners: "女性選手" },
    baseCorrectFeedback: "對的！「全部選手」是整體，所以是基準量。",
    baseIncorrectFeedback: "不對喔！「女性選手」只是全部選手的一部分。",
    baseDescription: "全部選手 (基準量)",
    comparisonDescription: "女性選手",
    totalParts: 5,
    comparisonParts: 2,
    knownValue: 240,
    calculationSteps: [
      {
        promptHTML: `女性占 40%，也就是 <span class="font-bold text-blue-600">5 份裡的 2 份</span>。女性 240 人是 2 份，那 <span class="font-bold text-purple-600">1 份</span> 是多少？`,
        formulaPrefix: "240 ÷ 2 =",
        answer: "120",
        correctFeedback: "很棒！你算出每 1 份的人數了！",
      },
      {
        promptHTML: `既然 <span class="font-bold text-purple-600">1 份是 120 人</span>，那 <span class="font-bold text-gray-800">全部選手 (5 份)</span> 是多少？`,
        formulaPrefix: "120 × 5 =",
        answer: "600",
        correctFeedback: "正確！總人數就算出來了！",
      }
    ],
    summary: {
      title: "恭喜你，完成作答！",
      stepsHTML: [
        `女性占 40%，也就是 2/5，等於 <span class="font-semibold text-blue-600">5 份中的 2 份</span>。`,
        `已知 <span class="font-semibold text-blue-600">女性選手 (2 份)</span> 是 <span class="font-semibold text-blue-600">240 人</span>。`,
        `先算 <span class="font-semibold text-purple-600">1 份</span> 是多少：<br/><span class="ml-6 font-mono">240 ÷ 2 = 120 人</span>`,
        `再算 <span class="font-semibold text-gray-800">全部選手 (5 份)</span>：<br/><span class="ml-6 font-mono">120 × 5 = 600 人</span>`,
      ],
      finalAnswer: (val) => `答案：全部有 ${val} 位選手。`,
    },
  },
  {
    id: 7,
    text: "小明買了一台含 5% 營業稅的電視，共付了 21000 元，請問這台電視未稅前的價格是多少元？",
    unit: "元",
    baseKey: "preTaxPrice",
    baseOptions: { preTaxPrice: "未稅價格", finalPrice: "含稅價格" },
    baseCorrectFeedback: "答對了！「未稅價格」是原始價格，所以是基準量。",
    baseIncorrectFeedback: "不對喔！「含稅價格」是加上稅之後的價格。",
    baseDescription: "未稅價格 (基準量)",
    comparisonDescription: "含稅價格",
    totalParts: 20,
    comparisonParts: 21,
    knownValue: 21000,
    calculationSteps: [
      {
        promptHTML: `含 5% 稅表示總價是 105%，也就是 <span class="font-bold text-blue-600">21 份</span> (未稅價是 20 份)。含稅價 21000 元是 21 份，那 <span class="font-bold text-purple-600">1 份</span> 是多少？`,
        formulaPrefix: "21000 ÷ 21 =",
        answer: "1000",
        correctFeedback: "完美！你算出每 1 份的金額了！",
      },
      {
        promptHTML: `既然 <span class="font-bold text-purple-600">1 份是 1000 元</span>，那 <span class="font-bold text-gray-800">未稅價格 (20 份)</span> 是多少？`,
        formulaPrefix: "1000 × 20 =",
        answer: "20000",
        correctFeedback: "正確！未稅價格就算出來了！",
      }
    ],
    summary: {
      title: "恭喜你，完成作答！",
      stepsHTML: [
        `含 5% 稅表示總價是 100% + 5% = 105%，等於 <span class="font-semibold text-blue-600">未稅價(20份)之外，再加1份稅金，共21份</span>。`,
        `已知 <span class="font-semibold text-blue-600">含稅價格 (21 份)</span> 是 <span class="font-semibold text-blue-600">21000 元</span>。`,
        `先算 <span class="font-semibold text-purple-600">1 份</span> 是多少：<br/><span class="ml-6 font-mono">21000 ÷ 21 = 1000 元</span>`,
        `再算 <span class="font-semibold text-gray-800">未稅價格 (20 份)</span>：<br/><span class="ml-6 font-mono">1000 × 20 = 20000 元</span>`,
      ],
      finalAnswer: (val) => `答案：這台電視未稅前的價格是 ${val} 元。`,
    },
  },
  {
    id: 8,
    text: "一個農場去年因颱風損失了 15% 的收成，最後只收成了 1700 公斤的蘋果，如果沒有颱風，預計可以收成多少公斤？",
    unit: "公斤",
    baseKey: "expectedHarvest",
    baseOptions: { expectedHarvest: "預計收成", actualHarvest: "實際收成" },
    baseCorrectFeedback: "是的！「預計收成」是完整的收成，所以是基準量。",
    baseIncorrectFeedback: "不對喔！「實際收成」是損失後剩下的部分。",
    baseDescription: "預計收成 (基準量)",
    comparisonDescription: "實際收成",
    totalParts: 20,
    comparisonParts: 17,
    knownValue: 1700,
    calculationSteps: [
      {
        promptHTML: `損失 15% 表示剩下 85%，也就是 <span class="font-bold text-blue-600">20 份裡的 17 份</span>。實際收成 1700 公斤是 17 份，那 <span class="font-bold text-purple-600">1 份</span> 是多少？`,
        formulaPrefix: "1700 ÷ 17 =",
        answer: "100",
        correctFeedback: "太好了！你算出每 1 份的重量了！",
      },
      {
        promptHTML: `既然 <span class="font-bold text-purple-600">1 份是 100 公斤</span>，那 <span class="font-bold text-gray-800">預計收成 (全部 20 份)</span> 是多少？`,
        formulaPrefix: "100 × 20 =",
        answer: "2000",
        correctFeedback: "正確！預計的收成就算出來了！",
      }
    ],
    summary: {
      title: "恭喜你，完成作答！",
      stepsHTML: [
        `損失 15% 表示剩下 100% - 15% = 85%，也就是 <span class="font-semibold text-blue-600">20 份中的 17 份</span>。`,
        `已知 <span class="font-semibold text-blue-600">實際收成 (17 份)</span> 是 <span class="font-semibold text-blue-600">1700 公斤</span>。`,
        `先算 <span class="font-semibold text-purple-600">1 份</span> 是多少：<br/><span class="ml-6 font-mono">1700 ÷ 17 = 100 公斤</span>`,
        `再算 <span class="font-semibold text-gray-800">預計收成 (全部 20 份)</span>：<br/><span class="ml-6 font-mono">100 × 20 = 2000 公斤</span>`,
      ],
      finalAnswer: (val) => `答案：預計可以收成 ${val} 公斤。`,
    },
  },
  {
    id: 9,
    text: "一本書，小華看了 40% 後，還剩下 180 頁沒看，這本書共有多少頁？",
    unit: "頁",
    baseKey: "totalPages",
    baseOptions: { totalPages: "書本總頁數", remainingPages: "剩下的頁數" },
    baseCorrectFeedback: "沒錯！「書本總頁數」是全部，所以是基準量。",
    baseIncorrectFeedback: "不對喔！「剩下的頁數」是看了一部分之後的量。",
    baseDescription: "書本總頁數 (基準量)",
    comparisonDescription: "剩下的頁數",
    totalParts: 5,
    comparisonParts: 3,
    knownValue: 180,
    calculationSteps: [
      {
        promptHTML: `看了 40% 表示剩下 60%，也就是 <span class="font-bold text-blue-600">5 份裡的 3 份</span>。剩下 180 頁是 3 份，那 <span class="font-bold text-purple-600">1 份</span> 是多少？`,
        formulaPrefix: "180 ÷ 3 =",
        answer: "60",
        correctFeedback: "很好！你算出每 1 份的頁數了！",
      },
      {
        promptHTML: `既然 <span class="font-bold text-purple-600">1 份是 60 頁</span>，那 <span class="font-bold text-gray-800">書本總頁數 (全部 5 份)</span> 是多少？`,
        formulaPrefix: "60 × 5 =",
        answer: "300",
        correctFeedback: "正確！這本書的總頁數就算出來了！",
      }
    ],
    summary: {
      title: "恭喜你，完成作答！",
      stepsHTML: [
        `看了 40% 表示剩下 100% - 40% = 60%，也就是 3/5，等於 <span class="font-semibold text-blue-600">5 份中的 3 份</span>。`,
        `已知 <span class="font-semibold text-blue-600">剩下的頁數 (3 份)</span> 是 <span class="font-semibold text-blue-600">180 頁</span>。`,
        `先算 <span class="font-semibold text-purple-600">1 份</span> 是多少：<br/><span class="ml-6 font-mono">180 ÷ 3 = 60 頁</span>`,
        `再算 <span class="font-semibold text-gray-800">書本總頁數 (全部 5 份)</span>：<br/><span class="ml-6 font-mono">60 × 5 = 300 頁</span>`,
      ],
      finalAnswer: (val) => `答案：這本書共有 ${val} 頁。`,
    },
  },
  {
    id: 10,
    text: "爸爸的體重是 80 公斤，比媽媽重了 25%，媽媽的體重是多少公斤？",
    unit: "公斤",
    baseKey: "mothersWeight",
    baseOptions: { mothersWeight: "媽媽的體重", fathersWeight: "爸爸的體重" },
    baseCorrectFeedback: "答對了！題目是「比媽媽重」，所以媽媽的體重是基準量。",
    baseIncorrectFeedback: "不對喔！爸爸的體重是跟媽媽比較後的結果。",
    baseDescription: "媽媽的體重 (基準量)",
    comparisonDescription: "爸爸的體重",
    totalParts: 4,
    comparisonParts: 5,
    knownValue: 80,
    calculationSteps: [
      {
        promptHTML: `比媽媽重 25%，表示爸爸的體重是媽媽的 125%，也就是 <span class="font-bold text-blue-600">5 份</span> (媽媽是 4 份)。爸爸體重 80 公斤是 5 份，那 <span class="font-bold text-purple-600">1 份</span> 是多少？`,
        formulaPrefix: "80 ÷ 5 =",
        answer: "16",
        correctFeedback: "幹得好！你算出每 1 份的重量了！",
      },
      {
        promptHTML: `既然 <span class="font-bold text-purple-600">1 份是 16 公斤</span>，那 <span class="font-bold text-gray-800">媽媽的體重 (4 份)</span> 是多少？`,
        formulaPrefix: "16 × 4 =",
        answer: "64",
        correctFeedback: "正確！這樣就得到媽媽的體重了！",
      }
    ],
    summary: {
      title: "恭喜你，完成作答！",
      stepsHTML: [
        `比媽媽重 25% 表示爸爸的體重是媽媽的 100% + 25% = 125%，也就是 <span class="font-semibold text-blue-600">媽媽是 4 份，爸爸是 5 份</span>。`,
        `已知 <span class="font-semibold text-blue-600">爸爸的體重 (5 份)</span> 是 <span class="font-semibold text-blue-600">80 公斤</span>。`,
        `先算 <span class="font-semibold text-purple-600">1 份</span> 是多少：<br/><span class="ml-6 font-mono">80 ÷ 5 = 16 公斤</span>`,
        `再算 <span class="font-semibold text-gray-800">媽媽的體重 (4 份)</span>：<br/><span class="ml-6 font-mono">16 × 4 = 64 公斤</span>`,
      ],
      finalAnswer: (val) => `答案：媽媽的體重是 ${val} 公斤。`,
    },
  }
];


interface BarModelProps {
  problem: Problem;
  step: Step;
  onCorrectSegmentClick: () => void;
  isSegmentClickable: boolean;
}

const BarModel: React.FC<BarModelProps> = ({ problem, step, onCorrectSegmentClick, isSegmentClickable }) => {
  const { totalParts, comparisonParts, baseDescription, comparisonDescription, knownValue, unit } = problem;
  const comparisonPercentage = Math.round((comparisonParts / totalParts) * 100);
  const showValue = step >= Step.CALCULATE;
  
  const clickablePartWidth = `${(comparisonParts / totalParts) * 100}%`;
  
  // Create a visual representation that handles comparison parts > total parts
  const visualTotalParts = Math.max(totalParts, comparisonParts);

  return (
    <div className="w-full max-w-2xl mx-auto my-8 text-center select-none">
      <p className="text-lg font-semibold text-gray-700 mb-2">{baseDescription}</p>
      <div className="relative h-12 flex rounded-md overflow-hidden border-2 border-gray-800 bg-gray-200">
        {Array.from({ length: totalParts }).map((_, i) => (
           <div key={i} className={`flex-1 bg-gray-200 ${ i < totalParts - 1 ? 'border-r border-gray-500' : ''}`}></div>
        ))}
        <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-bold text-gray-900 bg-white/50 px-2 py-1 rounded">100%</span>
        </div>
      </div>
      
      <div className="mt-6 relative h-20">
          <div 
            style={{ width: clickablePartWidth }} 
            className="absolute top-0 left-0 h-full"
          >
             <div className="relative h-full">
                {/* Bar model visual for comparison value */}
                <div className="absolute top-[-52px] left-0 h-12 flex rounded-md overflow-hidden border-2 border-blue-800 bg-blue-300" style={{ width: '100%' }}>
                   {Array.from({ length: comparisonParts }).map((_, i) => (
                      <div key={i} className={`flex-1 bg-blue-300 ${ i < comparisonParts - 1 ? 'border-r border-blue-500' : ''}`}></div>
                  ))}
                </div>
                {/* Brackets and labels */}
                <div className="absolute top-0 left-1/2 border-l-2 border-gray-500 h-2"></div>
                <div className="absolute bottom-0 left-1/2 border-l-2 border-gray-500 h-2"></div>
                <div className="absolute left-0 top-1/2 w-full border-t-2 border-gray-500"></div>
             </div>

             <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
                <p className="text-lg font-semibold text-blue-700">{comparisonDescription} ({comparisonPercentage}%)</p>
                {showValue && (
                  <div className="text-lg font-bold text-green-600">
                    <span className="animate-pulse">↓</span> {knownValue} {unit}
                  </div>
                )}
             </div>
          </div>
         {isSegmentClickable && (
            <button
              onClick={onCorrectSegmentClick}
              style={{ width: clickablePartWidth }}
              className="absolute top-[-52px] left-0 h-12 cursor-pointer hover:bg-yellow-300/50 transition-colors duration-200 rounded-md"
              aria-label={`點擊標示${comparisonDescription}`}
            />
          )}
      </div>
    </div>
  );
};


const App: React.FC = () => {
  const [problem, setProblem] = useState<Problem>(problems[0]);
  const [step, setStep] = useState<Step>(Step.SELECT_BASE);
  const [baseSelection, setBaseSelection] = useState<string | null>(null);
  const [isBaseCorrect, setIsBaseCorrect] = useState<boolean | null>(null);
  
  const [isLabelCorrect, setIsLabelCorrect] = useState<boolean | null>(null);

  const [currentCalcStepIndex, setCurrentCalcStepIndex] = useState(0);
  const [calcInput, setCalcInput] = useState('');
  const [isCalcCorrect, setIsCalcCorrect] = useState<boolean | null>(null);
  
  const [shake, setShake] = useState(false);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const resetAndLoadProblem = (newProblem: Problem) => {
    setProblem(newProblem);
    setStep(Step.SELECT_BASE);
    setBaseSelection(null);
    setIsBaseCorrect(null);
    setIsLabelCorrect(null);
    setCurrentCalcStepIndex(0);
    setCalcInput('');
    setIsCalcCorrect(null);
  }

  const handleProblemChange = (newProblem: Problem) => {
    if (problem.id !== newProblem.id) {
        resetAndLoadProblem(newProblem);
    }
  }

  const handleBaseSelection = (selectionKey: string) => {
    setBaseSelection(selectionKey);
    if (selectionKey === problem.baseKey) {
      setIsBaseCorrect(true);
      setTimeout(() => setStep(Step.LABEL_VALUE), 1000);
    } else {
      setIsBaseCorrect(false);
      triggerShake();
    }
  };

  const handleCorrectSegmentClick = () => {
    setIsLabelCorrect(true);
    setTimeout(() => setStep(Step.CALCULATE), 1000);
  };
  
  const handleCalcSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentStepData = problem.calculationSteps[currentCalcStepIndex];
    if (calcInput.trim() === currentStepData.answer) {
      setIsCalcCorrect(true);
      setTimeout(() => {
        setIsCalcCorrect(null);
        setCalcInput('');
        if (currentCalcStepIndex < problem.calculationSteps.length - 1) {
          setCurrentCalcStepIndex(currentCalcStepIndex + 1);
        } else {
          setStep(Step.SUMMARY);
        }
      }, 1000);
    } else {
      setIsCalcCorrect(false);
      triggerShake();
    }
  };

  const finalAnswerValue = useMemo(() => {
    // Check if calculation steps exist and are not empty
    if (!problem.calculationSteps || problem.calculationSteps.length === 0) {
      return '';
    }
    return problem.calculationSteps[problem.calculationSteps.length - 1].answer;
  }, [problem]);

  const renderContent = () => {
    switch (step) {
      case Step.SELECT_BASE:
        return (
          <>
            <h2 className="text-xl font-bold text-gray-800 mb-4">步驟 1: 找出基準量</h2>
            <p className="text-lg text-gray-700 mb-6">誰是基準量 (1 或 100%)？</p>
            <div className={`flex flex-col sm:flex-row gap-4 justify-center ${shake ? 'animate-shake' : ''}`}>
              {Object.entries(problem.baseOptions).map(([key, text]) => (
                <button
                  key={key}
                  onClick={() => handleBaseSelection(key)}
                  className={`w-full sm:w-auto text-lg font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                    baseSelection === key 
                      ? (isBaseCorrect ? 'bg-green-500 text-white shadow-lg' : isBaseCorrect === false ? 'bg-red-500 text-white shadow-lg' : 'bg-white text-blue-600 shadow-md hover:bg-blue-50')
                      : 'bg-white text-blue-600 shadow-md hover:bg-blue-50'
                  }`}
                >
                  {text}
                </button>
              ))}
            </div>
            {isBaseCorrect === true && (
              <div className="mt-6 text-green-600 font-semibold flex items-center justify-center gap-2">
                <CheckIcon /> {problem.baseCorrectFeedback}
              </div>
            )}
            {isBaseCorrect === false && (
              <div className="mt-6 text-red-600 font-semibold flex items-center justify-center gap-2">
                <XIcon /> {problem.baseIncorrectFeedback}
              </div>
            )}
          </>
        );
      case Step.LABEL_VALUE:
        return (
          <>
            <h2 className="text-xl font-bold text-gray-800 mb-2">步驟 2: 建立線段圖 & 標示已知數值</h2>
            <p className="text-lg text-gray-700 mb-6">題目中的「{problem.knownValue} {problem.unit}」是指圖上的哪一段？請點擊線段圖上的正確區塊。</p>
            <BarModel problem={problem} step={step} onCorrectSegmentClick={handleCorrectSegmentClick} isSegmentClickable={true} />
            {isLabelCorrect && (
               <div className="mt-4 text-green-600 font-semibold flex items-center justify-center gap-2 text-lg">
                <CheckIcon /> 太棒了！你知道了已知數值的位置。
              </div>
            )}
          </>
        );
      case Step.CALCULATE:
        const currentStepData = problem.calculationSteps[currentCalcStepIndex];
        return (
           <>
            <h2 className="text-xl font-bold text-gray-800 mb-2">步驟 3: 計算問題</h2>
            <BarModel problem={problem} step={step} onCorrectSegmentClick={() => {}} isSegmentClickable={false} />
            <p className="text-lg text-gray-700 mt-4 mb-4" dangerouslySetInnerHTML={{ __html: currentStepData.promptHTML }} />
            <form onSubmit={handleCalcSubmit} className={`mt-4 p-4 rounded-lg bg-gray-100 ${shake ? 'animate-shake' : ''}`}>
              <label htmlFor="calc" className="text-lg font-mono text-gray-800">{currentStepData.formulaPrefix}</label>
              <input 
                id="calc"
                type="number"
                value={calcInput}
                onChange={(e) => setCalcInput(e.target.value)}
                className={`w-40 ml-2 text-lg p-2 border-2 rounded-md transition-colors duration-300 text-center ${
                  isCalcCorrect === true ? 'border-green-500 bg-green-100' : 
                  isCalcCorrect === false ? 'border-red-500 bg-red-100' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                }`}
                autoFocus
              />
              <button type="submit" className="ml-4 bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300">確認</button>
              {isCalcCorrect === false && <p className="text-red-500 mt-2">答案不對喔，請再試一次！</p>}
            </form>
            {isCalcCorrect && (
              <div className="mt-4 text-green-600 font-semibold flex items-center justify-center gap-2 text-lg">
                <CheckIcon /> {currentStepData.correctFeedback}
              </div>
            )}
          </>
        );
      case Step.SUMMARY:
        return (
          <div className="text-left w-full">
            <h2 className="text-2xl font-bold text-green-600 mb-2 text-center">{problem.summary.title}</h2>
            <BarModel problem={problem} step={step} onCorrectSegmentClick={() => {}} isSegmentClickable={false} />
            <div className="mt-4 bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">完整計算過程：</h3>
              <ul className="space-y-3 text-lg text-gray-700 list-disc list-inside">
                {problem.summary.stepsHTML.map((s, i) => <li key={i} dangerouslySetInnerHTML={{ __html: s}} />)}
              </ul>
            </div>
            <div className="mt-6 text-center text-2xl font-bold bg-yellow-200 text-yellow-900 p-4 rounded-lg">
              {problem.summary.finalAnswer(finalAnswerValue)}
            </div>
            <div className="text-center mt-8">
              <button onClick={() => resetAndLoadProblem(problem)} className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 transition-colors duration-300 text-lg">
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
      const totalSteps = 2 + problem.calculationSteps.length; // Select Base, Label, N calc steps
      let completedSteps = 0;
      if (step > Step.SELECT_BASE) completedSteps++;
      if (step > Step.LABEL_VALUE) completedSteps++;
      if (step === Step.CALCULATE) completedSteps += currentCalcStepIndex;
      if (step > Step.CALCULATE) completedSteps += problem.calculationSteps.length;

      return (completedSteps / totalSteps) * 100;
  }, [step, currentCalcStepIndex, problem]);

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
        /* Custom scrollbar for problem selector */
        .problem-selector {
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 #ffffff;
        }
        .problem-selector::-webkit-scrollbar {
          height: 12px;
        }
        .problem-selector::-webkit-scrollbar-track {
          background: #ffffff;
        }
        .problem-selector::-webkit-scrollbar-thumb {
          background-color: #e2e8f0; /* slate-200 */
          border-radius: 20px;
          border: 3px solid #ffffff; /* white, same as card background */
        }
        .problem-selector::-webkit-scrollbar-thumb:hover {
          background-color: #cbd5e1; /* slate-300 */
        }
      `}</style>
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-6 sm:p-10 transform transition-all duration-500">
        <header className="text-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-6">
            引導式線段圖解題
          </h1>
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-700 mb-4">選擇一個問題來挑戰！</h2>
            <div className="problem-selector flex items-stretch overflow-x-auto gap-4 sm:gap-6 pb-4 -mx-6 sm:-mx-10 px-6 sm:px-10">
              {problems.map(p => (
                <button
                  key={p.id}
                  onClick={() => handleProblemChange(p)}
                  className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 w-56 sm:w-60 flex-shrink-0 text-left flex flex-col justify-between transform hover:-translate-y-1 hover:shadow-xl ${
                    problem.id === p.id 
                      ? 'bg-blue-50 border-blue-500 shadow-lg' 
                      : 'bg-white border-gray-300 hover:border-blue-400'
                  }`}
                  aria-pressed={problem.id === p.id}
                >
                  <div>
                    <span className={`font-bold text-lg ${problem.id === p.id ? 'text-blue-700' : 'text-gray-800'}`}>問題 {p.id}</span>
                    <p className={`mt-2 text-sm ${problem.id === p.id ? 'text-blue-900' : 'text-gray-600'}`}>
                      {p.text.substring(0, 35)}...
                    </p>
                  </div>
                  {problem.id === p.id && (
                    <div className="mt-3 text-right">
                        <span className="inline-flex items-center gap-1 text-sm font-semibold text-white bg-blue-600 px-3 py-1 rounded-full" aria-label="Currently selected">
                           目前選擇 <CheckIcon className="w-4 h-4" />
                        </span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
          <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
            <p className="text-lg text-gray-800 text-left leading-relaxed">{problem.text}</p>
          </div>
        </header>

        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-green-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
        </div>

        <main className="text-center min-h-[420px] flex flex-col items-center justify-center">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
