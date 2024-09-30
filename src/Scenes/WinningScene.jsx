import Phaser from "phaser";

const WinningScene = () => {
  return { create: function () {
    const scoreText = this.add.text(16, 16, `Score:`, {
        fontSize: "32px",
        fill: "#fff",
      });
  } };
};

export default WinningScene;
