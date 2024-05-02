<template>
    <div>
      <canvas ref="canvas" @mousedown="startDrawing" @mousemove="draw" @mouseup="stopDrawing"></canvas>
      <button @click="clearCanvas">Effacer</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        drawing: false,
        x: 0,
        y: 0,
      };
    },
    methods: {
      startDrawing(event) {
        this.drawing = true;
        this.x = event.offsetX;
        this.y = event.offsetY;
      },
      draw(event) {
        if (this.drawing) {
          const ctx = this.$refs.canvas.getContext("2d");
          ctx.beginPath();
          ctx.moveTo(this.x, this.y);
          this.x = event.offsetX;
          this.y = event.offsetY;
          ctx.lineTo(this.x, this.y);
          ctx.stroke();
        }
      },
      stopDrawing() {
        this.drawing = false;
      },
      clearCanvas() {
        const canvasData = this.$refs.canvas.toDataURL(); 
        console.log('canvasData',canvasData)
        const ctx = this.$refs.canvas.getContext("2d");
        ctx.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);
      },
    },
  };
  </script>
  
  <style scoped>
  canvas {
    border: 1px solid #000;
  }
  </style>
  