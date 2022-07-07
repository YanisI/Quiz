import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import Quiz from '../components/Quiz'


const Home = () => {

  const [reset,setReset] = useState(true);

  const replay = () => {
    setReset(!reset);
  }
  
  useEffect(() => {
    axios(`https://quizapi.io/api/v1/questions?apiKey=${process.env.REACT_APP_APIKEY}`)
    .then(res => {
      setQuestions(res.data);
      console.log(res.data)
    });
  },[reset])

  const [questions,setQuestions] = useState([])
  
  return (
    <div className='home'>
        { questions.length > 0  && <Quiz question={questions} replay={replay} />}
    </div>
  )
}

export default Home