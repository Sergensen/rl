module.exports = {
  delay: 0.3,
  globalIntro: {
    visible: i => ({
      y: 0,
      opacity: 1,
      transition: { 
        duration: 1, 
        //hab extra "delay" objekt gemacht, aber wenn ich this.deplay benutze geht das nicht :(
        delay: i * 0.2 + 0.1, 
        type: "spring" 
      }
    }),
    hidden: ({
      y: -5,
      opacity: 0
    }),
  },
  
};