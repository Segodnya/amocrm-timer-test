import React, { useState, useEffect, useRef } from "react";

function CountdownTimer() {
  const [timeInSeconds, setTimeInSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  // хук `useRef` используется, чтобы получить ссылку на `input`
  // и очистить его значение в функции `useEffect`.
  // Теперь после нажатия кнопки "Старт" значение `input` будет очищено
  // (при первом изменении состояния таймера)
  const inputRef = useRef(null);

  useEffect(() => {
    let interval = null;
    inputRef.current.value = "";

    // Если значение `isActive` равно `true` и значение `timeInSeconds` больше 0,
    // то таймер будет продолжать работать.
    // Если значение `timeInSeconds` достигло 0,
    // то таймер остановится автоматически путем очистки интервала.
    if (isActive && timeInSeconds > 0) {
      interval = setInterval(() => {
        setTimeInSeconds((timeInSeconds) => timeInSeconds - 1);
      }, 1000);
    } else if (timeInSeconds === 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, timeInSeconds]);

  const handleStartTimer = () => {
    setIsActive(true);
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time - hours * 3600) / 60);
    const seconds = time - hours * 3600 - minutes * 60;

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  // функцию обрабатывает изменения значения в `input`
  // и устанавливает новое значение только если оно больше или равно 0
  function handleInputChange(event) {
    const value = event.target.value;
    setTimeInSeconds(Number(value >= 0 ? value : 0));
  }

  return (
    <div>
      <div>
        <label>Введите начальное значение (в секундах):</label>
        <input type="number" min="0" value={timeInSeconds} onChange={handleInputChange} ref={inputRef} />
      </div>
      <div>
        <button onClick={handleStartTimer}>Старт</button>
      </div>
      <div>{formatTime(timeInSeconds)}</div>
    </div>
  );
}

export default CountdownTimer;
