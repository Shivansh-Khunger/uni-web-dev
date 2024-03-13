document.addEventListener('DOMContentLoaded', function() {
  var canvas = document.getElementById('meme');
  var ctx = canvas.getContext('2d');

  function drawMeme() {
    var img = document.getElementById('start-image');
    var fontSize = parseInt(document.getElementById('text_font_size').value);
    var memeSize = parseInt(document.getElementById('canvas_size').value);

    document.getElementById('text_top_offset').max = memeSize;
    document.getElementById('text_bottom_offset').max = memeSize;
 
    canvas.width = memeSize;
    canvas.height = memeSize;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var croppingDimension = img.height;
    if (img.width < croppingDimension) {
      croppingDimension = img.width;
    }
    ctx.drawImage(img, 0, 0, croppingDimension, croppingDimension, 0, 0, memeSize, memeSize);

    ctx.lineWidth = parseInt(document.getElementById('text_stroke_width').value);
    ctx.font = fontSize + 'pt sans-serif';
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    var lineHeight = fontSize + parseInt(document.getElementById('text_line_height').value);
    var maxTextAreaWidth = memeSize * 0.85;

    var text1 = document.getElementById('text_top').value.toUpperCase();
    var x = memeSize / 2;
    var y = parseInt(document.getElementById('text_top_offset').value);
    writeText(ctx, text1, x, y, maxTextAreaWidth, lineHeight);

    var text2 = document.getElementById('text_bottom').value.toUpperCase();
    y = parseInt(document.getElementById('text_bottom_offset').value);
    writeText(ctx, text2, x, y, maxTextAreaWidth, lineHeight);
  }

  function writeText(ctx, text, x, y, maxWidth, lineHeight) {
    var words = text.split(' ');
    var line = '';
    var lines = [];

    for (var n = 0; n < words.length; n++) {
      var testLine = line + ' ' + words[n];
      var testWidth = ctx.measureText(testLine).width;
      if (testWidth > maxWidth) {
        lines.push(line);
        line = words[n] + ' ';
      } else {
        line = testLine;
      }
    }

    lines.push(line);

    for (var k = 0; k < lines.length; k++) {
      ctx.strokeText(lines[k], x, y + lineHeight * k);
      ctx.fillText(lines[k], x, y + lineHeight * k);
    }
  }

  document.getElementById('imgInp').addEventListener('change', function() {
    var input = this;

    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
        document.getElementById('start-image').src = e.target.result;
      }
      reader.readAsDataURL(input.files[0]);
    }

    setTimeout(drawMeme, 500);
  });

  var inputs = ['text_top', 'text_bottom', 'text_top_offset', 'text_bottom_offset', 'text_font_size', 'text_line_height', 'text_stroke_width', 'canvas_size'];
  inputs.forEach(function(id) {
    document.getElementById(id).addEventListener('input', drawMeme);
  });

  document.getElementById('download_meme').addEventListener('click', function(e) {
    this.href = canvas.toDataURL();
    this.download = 'meme.png';
  });

  setTimeout(drawMeme, 100);
});