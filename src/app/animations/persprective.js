const perspective = (parentNode, childNode, transformOptions) => {
  let counter = 0;
  const updateRate = 10;
  const isTimeToUpdate = () => counter++ % updateRate === 0;

  const mouse = {
    _x: 0,
    _y: 0,
    x: 0,
    y: 0,
    updatePosition(event) {
      this.x = event.offsetX - this._x;
      this.y = (event.offsetY - this._y) * -1;
    },
    setOrigin(node) {
      this._x = Math.floor(node.offsetWidth / 2);
      this._y = Math.floor(node.offsetHeight / 2);
    },
    show: function () {
      return "(" + this.x + ", " + this.y + ")";
    },
  };

  mouse.setOrigin(parentNode);

  const updateTransformStyle = (x, y) => {
    const style = `rotateX(${x}deg) rotateY(${y}deg) ${transformOptions}`;
    childNode.style.transform = style;
    childNode.style.webkitTransform = style;
    childNode.style.mozTransform = style;
    childNode.style.msTransform = style;
    childNode.style.oTransform = style;
  };

  const updatePosition = (e) => {
    mouse.updatePosition(e);
    updateTransformStyle(
      (mouse.y / childNode.offsetHeight / 2).toFixed(2) * 50,
      (mouse.x / childNode.offsetWidth / 2).toFixed(2) * 50
    );
  };

  const onMouseEnter = (e) => {
    updatePosition(e);
  };

  const onMouseLeave = () => {
    childNode.style = "";
  };

  const onMouseMove = () => {
    if (isTimeToUpdate()) {
      updatePosition(event);
    }
  };

  parentNode.addEventListener("mouseenter", onMouseEnter);
  parentNode.addEventListener("mousemove", onMouseMove);
  parentNode.addEventListener("mouseleave", onMouseLeave);
};

const skills = document.querySelectorAll(".about__skill");

for (const skill of skills) {
  const img = skill.querySelector("img");

  perspective(skill, img, "scale(1.1)");
}
