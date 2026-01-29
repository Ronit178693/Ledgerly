import React, { useEffect, useRef } from 'react';

const IncomeGraph = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const container = canvas.parentElement;
    let width, height;
    let dpr = window.devicePixelRatio || 1;
    
    const updateCanvasSize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
    };
    
    updateCanvasSize();
    
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    
    // Animation state
    let animationFrame;
    let progress = 0;
    const duration = 2000; // 2 seconds
    const startTime = Date.now();
    
    // Handle resize - will be defined before use
    const handleResize = () => {
      updateCanvasSize();
      const newCtx = canvas.getContext('2d');
      newCtx.scale(dpr, dpr);
    };
    
    window.addEventListener('resize', handleResize);

    // Sample data points (income over months)
    const dataPoints = [
      { month: 'Jan', value: 2500 },
      { month: 'Feb', value: 3200 },
      { month: 'Mar', value: 2800 },
      { month: 'Apr', value: 3800 },
      { month: 'May', value: 4200 },
      { month: 'Jun', value: 4500 },
    ];

    const maxValue = Math.max(...dataPoints.map(d => d.value));
    const minValue = Math.min(...dataPoints.map(d => d.value));
    const range = maxValue - minValue || 1;

    const drawGraph = () => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Calculate current progress
      const elapsed = Date.now() - startTime;
      progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic

      // Draw grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      for (let i = 0; i <= 5; i++) {
        const y = 50 + (height - 100) * (i / 5);
        ctx.beginPath();
        ctx.moveTo(60, y);
        ctx.lineTo(width - 40, y);
        ctx.stroke();
      }

      // Draw axes
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 2;
      // Y-axis
      ctx.beginPath();
      ctx.moveTo(60, 30);
      ctx.lineTo(60, height - 50);
      ctx.stroke();
      // X-axis
      ctx.beginPath();
      ctx.moveTo(60, height - 50);
      ctx.lineTo(width - 40, height - 50);
      ctx.stroke();

      // Draw area under curve
      const pointSpacing = (width - 100) / (dataPoints.length - 1);
      const graphHeight = height - 100;
      const baseY = height - 50;

      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.beginPath();
      ctx.moveTo(60, baseY);

      dataPoints.forEach((point, index) => {
        const x = 60 + index * pointSpacing;
        const normalizedValue = (point.value - minValue) / range;
        const y = baseY - normalizedValue * graphHeight * easedProgress;
        ctx.lineTo(x, y);
      });

      ctx.lineTo(60 + (dataPoints.length - 1) * pointSpacing, baseY);
      ctx.closePath();
      ctx.fill();

      // Draw line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.lineWidth = 3;
      ctx.shadowBlur = 10;
      ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
      ctx.beginPath();

      dataPoints.forEach((point, index) => {
        const x = 60 + index * pointSpacing;
        const normalizedValue = (point.value - minValue) / range;
        const y = baseY - normalizedValue * graphHeight * easedProgress;
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });

      ctx.stroke();
      ctx.shadowBlur = 0;

      // Draw data points
      dataPoints.forEach((point, index) => {
        const x = 60 + index * pointSpacing;
        const normalizedValue = (point.value - minValue) / range;
        const y = baseY - normalizedValue * graphHeight * easedProgress;

        // Outer glow
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fill();

        // Inner point
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();

        // Month labels
        if (progress > 0.5) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
          ctx.font = '12px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(point.month, x, baseY + 20);
        }
      });

      // Draw value labels
      if (progress > 0.7) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'right';
        for (let i = 0; i <= 5; i++) {
          const value = minValue + (range * (5 - i) / 5);
          const y = 50 + (height - 100) * (i / 5);
          ctx.fillText(`$${Math.round(value)}`, 55, y + 5);
        }
      }

      if (progress < 1) {
        animationFrame = requestAnimationFrame(drawGraph);
      } else {
        // Continuous subtle animation
        const animate = () => {
          const time = Date.now() * 0.001;
          ctx.clearRect(0, 0, width, height);
          
          // Redraw with subtle pulse
          const pulse = Math.sin(time) * 0.05 + 1;
          
          // Draw grid, axes, area, line, and points (same as above but with pulse)
          // Grid lines
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
          ctx.lineWidth = 1;
          for (let i = 0; i <= 5; i++) {
            const y = 50 + (height - 100) * (i / 5);
            ctx.beginPath();
            ctx.moveTo(60, y);
            ctx.lineTo(width - 40, y);
            ctx.stroke();
          }

          // Axes
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(60, 30);
          ctx.lineTo(60, height - 50);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(60, height - 50);
          ctx.lineTo(width - 40, height - 50);
          ctx.stroke();

          // Area
          ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
          ctx.beginPath();
          ctx.moveTo(60, baseY);
          dataPoints.forEach((point, index) => {
            const x = 60 + index * pointSpacing;
            const normalizedValue = (point.value - minValue) / range;
            const y = baseY - normalizedValue * graphHeight * pulse;
            ctx.lineTo(x, y);
          });
          ctx.lineTo(60 + (dataPoints.length - 1) * pointSpacing, baseY);
          ctx.closePath();
          ctx.fill();

          // Line
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.lineWidth = 3;
          ctx.shadowBlur = 10;
          ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
          ctx.beginPath();
          dataPoints.forEach((point, index) => {
            const x = 60 + index * pointSpacing;
            const normalizedValue = (point.value - minValue) / range;
            const y = baseY - normalizedValue * graphHeight * pulse;
            if (index === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          });
          ctx.stroke();
          ctx.shadowBlur = 0;

          // Points
          dataPoints.forEach((point, index) => {
            const x = 60 + index * pointSpacing;
            const normalizedValue = (point.value - minValue) / range;
            const y = baseY - normalizedValue * graphHeight * pulse;
            ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.beginPath();
            ctx.arc(x, y, 8, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.fill();
          });

          // Labels
          ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
          ctx.font = '12px Arial';
          ctx.textAlign = 'center';
          dataPoints.forEach((point, index) => {
            const x = 60 + index * pointSpacing;
            ctx.fillText(point.month, x, baseY + 20);
          });

          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.font = 'bold 14px Arial';
          ctx.textAlign = 'right';
          for (let i = 0; i <= 5; i++) {
            const value = minValue + (range * (5 - i) / 5);
            const y = 50 + (height - 100) * (i / 5);
            ctx.fillText(`$${Math.round(value)}`, 55, y + 5);
          }

          requestAnimationFrame(animate);
        };
        animate();
      }
    };

    animationFrame = requestAnimationFrame(drawGraph);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <div className="hero-illustration">
      <canvas ref={canvasRef} className="income-graph-canvas"></canvas>
    </div>
  );
};

export default IncomeGraph;

