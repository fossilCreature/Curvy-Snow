(function() {

  window.onload = function() {
    var ctx = document.getElementById('snow').getContext('2d');
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    var snowflakes = [];
    var amount = 80;

    var Flake = function(y) {
      var w = ctx.canvas.width;
      var h = ctx.canvas.height;
      return {
        x: Math.random() * w,
        y: y || Math.random() * h,
        d: 1 + Math.random() * 19,
        r: 4,
        a: Math.floor(Math.random() * 360),
        update: function() {
          this.y += this.d * 0.07;
          this.x += Math.cos(this.a) * (this.d / 30);

          ctx.fillStyle = 'rgba(255,255,255,' + this.d / 20 + ')';
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.r * (this.d * 0.05), 0, 2 * Math.PI, true);
          ctx.closePath();
          ctx.fill();

          if (this.a < 360) {
            this.a += 0.05;
          } else {
            this.a = 0;
          }
          
          if (this.y > h) this.die();
        },
        die: function() {
          var i = snowflakes.indexOf(this);
          snowflakes.splice(i, 1);
        }
      }
    }

    var init = function() {
      for (var i = 0; i < amount; i++) {
        snowflakes.push(Flake());
      }
    }

    var step = function() {
      ctx.canvas.width = ctx.canvas.width;
      for (var i = snowflakes.length - 1; i > 0; i--) {
        snowflakes[i].update();
      }
      if (snowflakes.length < amount) {
        snowflakes.push(Flake(1));
      }
      window.requestAnimationFrame(step);
    }

    init();
    window.requestAnimationFrame(step);
  }

})()
