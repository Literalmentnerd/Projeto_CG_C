
function generateMobiusVertices(numSegments, radius) {
    const vertices = [];
    for (let i = 0; i <= numSegments; i++) {
        const theta = (i / numSegments) * 2 * Math.PI;
        const nextTheta = ((i + 1) / numSegments) * 2 * Math.PI;

        const x1 = (radius + (-radius/4 * Math.cos(theta/2))) * Math.cos(theta);
        const y1 = (radius + (-radius/4 * Math.cos(theta/2))) * Math.sin(theta);
        const z1 = (-radius/4)*Math.sin(theta/2);

        const x2 = (radius + (radius/4 * Math.cos(theta/2))) * Math.cos(theta);
        const y2 = (radius + (radius/4 * Math.cos(theta/2))) * Math.sin(theta);
        const z2 = (radius/4)*Math.sin(theta/2);

        const x3 = (radius + (-radius/4 * Math.cos(nextTheta/2))) * Math.cos(nextTheta);
        const y3 = (radius + (-radius/4 * Math.cos(nextTheta/2))) * Math.sin(nextTheta);
        const z3 = (-radius/4)*Math.sin(nextTheta/2);

        const x4 = (radius + (radius/4 * Math.cos(nextTheta/2))) * Math.cos(nextTheta);
        const y4 = (radius + (radius/4 * Math.cos(nextTheta/2))) * Math.sin(nextTheta);
        const z4 = (radius/4)*Math.sin(nextTheta/2);


        vertices.push(x1, y1, z1);
        vertices.push(x2, y2, z2);
        vertices.push(x3, y3, z3);

        vertices.push(x2, y2, z2);
        vertices.push(x3, y3, z3);
        vertices.push(x4, y4, z4);
    }

    return vertices;
}

const fs = require('fs');
let data = generateMobiusVertices(100, 20).toString();
fs.writeFile('mobius-vertices.txt', data, (err) => {

    // In case of a error throw err.
    if (err) throw err;
})