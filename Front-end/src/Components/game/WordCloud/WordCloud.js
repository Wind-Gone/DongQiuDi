import React,{useState,useEffect} from 'react'
import {WordCloud} from '@ant-design/charts'
import LPLMask from './LPLMask.png'

function WordCloudLPL() {
  const [data, setData] = useState([]);
  useEffect(() => {
    asyncFetch();
  }, []);
  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/antv-keywords.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  var config = {
    data: data,
    wordField: 'name',
    weightField: 'value',
    colorField: 'value',
    imageMask: LPLMask,
    wordStyle: {
      fontFamily: 'Verdana',
      fontSize: [8, 32],
    },
  };

  return (
    <div>
      <WordCloud {...config} />;
    </div>
  )
}

export default WordCloudLPL
