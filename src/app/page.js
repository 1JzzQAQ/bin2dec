"use client";

import React, { useState } from 'react'
import ReactDOM from 'react-dom'

export default function Home() {
  const [binaryText, setBinaryText] = useState('')
  const [decimalText, setDecimalText] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  //提交事件：二进制转换为十进制
  const onFormSubmit = e => {
    e.preventDefault()

    //确保输入为0或1
    if(!/^[01]+$/.test(binaryText)){
      setErrorMessage('Enter either 0 or 1')
      return
    }

    setErrorMessage('')

    //公式：
    //输入：1 => 输出：1*（2^0）= 1
    //输入：10 => 输出： 1*（2^1）+ 0*（2^0）= 2
    //先反转input
    const reverseBinaryText = binaryText.split('').map(Number).reverse()

    //计算结果
    const result = reverseBinaryText.reduce(
      (sum,bit,idx) =>
        sum + bit * Math.pow(2,idx)
    )

    setDecimalText(result)
  }

  return (
    <>
      <h1>Binary to Decimal Converter</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={onFormSubmit}> 
        <div style={{ margin: "1rem 0" }}>
          <label>Binary Input</label>
          <input
            style={{ padding: "0.5rem", marginLeft:"10px" ,marginRight: "1rem" }}
            type="text"
            value={binaryText}
            placeholder='Enter 0 or 1'
            name='binary'
            onChange={e => setBinaryText(e.target.value)}
          />
          <button type="submit">Convert</button>
        </div>
        <div style={{ margin: "1rem 0" }}>
          <label>Decimal Output</label>
          <input
           style={{ padding: "0.5rem", marginLeft:"1rem", marginRight: "1rem" }}
            type="text"
            value={decimalText}
            name='decimal'
            disabled
          />
        </div>
      </form>
    </>
  );
}
