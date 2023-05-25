const SLIDE_IDS = [
    'info1',
    'info2',
    'info3',
  ];
  
  export const IntroSlides = SLIDE_IDS.map((el) => {
    return {
      content: <div className="heroimage" />,
      style: {
        backgroundImage: `url("/${el}.png")`, 
      },
    };
  });
  