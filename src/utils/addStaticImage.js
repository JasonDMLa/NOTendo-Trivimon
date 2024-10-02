export function addStaticImage(scene, x, y, key, scale) {
    return scene.physics.add.staticImage(x, y, key).setScale(scale);
}