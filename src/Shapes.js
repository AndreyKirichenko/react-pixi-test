import Isometry from './Isometry';

class Shapes {

  cached = {
    fields: {}
  };

  cloud({
          pointsBetween,
          scale
        }) {

  }

  plantLine({
              minHeight,
              maxHeight,
              pointsBetween,
              scale,
              flX,
              flY,
              flCX,
            }) {

    const averageX = scale / pointsBetween;
    const yMaxDelta = maxHeight - minHeight;

    let pointsArr = [
      {
        type: 'M',
        x: 0,
        y: 0
      }
    ];

    for (let i = 1; i < pointsBetween + 1; i++) {
      const curFlX = (Math.random() - 0.5) * flX;
      const curFlY = (Math.random()) * flY;
      const curFlCX = (Math.random() - 0.5) * flCX;

      const x = averageX * i + curFlX * averageX;
      const y = Isometry.getY(x) - minHeight;

      const prevPoint = pointsArr[pointsArr.length - 1];
      const yDelta = yMaxDelta * curFlY;

      const c1x = Math.ceil(prevPoint.x + averageX * curFlCX);
      const c1y = Math.ceil(prevPoint.y - yDelta);

      const c2x = Math.ceil(x + averageX * curFlCX);
      const c2y = Math.ceil(y - yDelta);


      pointsArr.push(
        {
          type: 'C',
          x,
          y,
          c1x,
          c1y,
          c2x,
          c2y
        }
      );
    }

    pointsArr.push(
      {
        type: 'L',
        x: scale,
        y: Isometry.getY(scale),
      },
      {
        type: 'L',
        x: 0,
        y: 0
      },
    );

    return pointsArr;
  }

  field(scale = 240) {
    if(this.cached.fields[scale]) {
      return this.cached.fields[scale];
    }

    let coords = [];

    coords[0] = {
      type: 'M',
      x: 0,
      y: 0
    };

    coords[1] = {
      type: 'L',
      x: Math.ceil(scale),
      y: Math.ceil(Isometry.getY(scale))
    };

    coords[2] = {
      type: 'L',
      x: 0,
      y: Math.ceil(coords[1].y * 2)
    };

    coords[3] = {
      type: 'L',
      x: Math.ceil(-coords[1].x),
      y: Math.ceil(coords[1].y)
    };

    coords[4] = {
      type: 'L',
      x: 0,
      y: 0
    };

    this.cached.fields[scale] = coords;

    return coords;
  }
}

export default new Shapes();
