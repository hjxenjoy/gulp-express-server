document.querySelector('h3').addEventListener('click', function () {
  alert('今天是' + (new Date()).toLocaleString() + '，您点击了首页标题');
}, false);