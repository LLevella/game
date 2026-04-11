'use strict';

describe('Логика движения игрока', () => {
  before(() => {
    initGameObjects();
  });

  it('Не начинает прыжок при боковом столкновении со стеной', () => {
    const player = new Player(new Vector(1, 2));
    player.speed.y = 5;
    player.wontJump = true;

    const level = new Level([
      [undefined, undefined, 'wall'],
      [undefined, undefined, 'wall'],
      [undefined, undefined, 'wall'],
      [undefined, undefined, 'wall']
    ], [player]);

    player.moveX(0.2, level, { right: true, up: true });

    expect(player.speed.y).to.equal(5);
  });

  it('Начинает прыжок только при вертикальном столкновении с опорой', () => {
    const player = new Player();
    player.speed.y = 5;
    const level = {
      obstacleAt() {
        return 'wall';
      },
      playerTouched() {}
    };

    player.moveY(0.2, level, { up: true });

    expect(player.speed.y).to.equal(-17);
  });
});
