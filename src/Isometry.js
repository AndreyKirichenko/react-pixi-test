class Isometry {
  static getY(coord, angle = Math.PI/6) {
    return coord * Math.tan(angle);
  }

  static toFrontalCoords(x, y) {
    const frontX = x - y;
    const frontY = Isometry.getY(x) + Isometry.getY(y);

    return {
      x: frontX,
      y: frontY
    }
  }
}

export default Isometry;
