import type { SVGProps } from 'react';

const PoddleSvg = (props: SVGProps<SVGSVGElement>) => {
  const fillColor = props.fill || 'currentColor';

  return (
    <svg
      viewBox='0 0 740 740'
      xmlns='http://www.w3.org/2000/svg'
      {...props}>
      <g fill={fillColor}>
        <rect
          x={140}
          y={610}
          width={70}
          height={70}
          rx={35}
        />
        <rect
          x={60}
          y={530}
          width={70}
          height={70}
          rx={35}
        />
        <rect
          x={140}
          y={450}
          width={70}
          height={70}
          rx={35}
        />
        <rect
          x={220}
          y={530}
          width={70}
          height={70}
          rx={35}
        />
        <rect
          x={270}
          y={670}
          width={70}
          height={70}
          rx={35}
        />
        <rect
          y={400}
          width={70}
          height={70}
          rx={35}
        />
        <rect
          x={130}
          y={140}
          width={70}
          height={70}
          rx={35}
          transform='rotate(90 130 140)'
        />
        <rect
          x={210}
          y={60}
          width={70}
          height={70}
          rx={35}
          transform='rotate(90 210 60)'
        />
        <rect
          x={290}
          y={140}
          width={70}
          height={70}
          rx={35}
          transform='rotate(90 290 140)'
        />
        <rect
          x={210}
          y={220}
          width={70}
          height={70}
          rx={35}
          transform='rotate(90 210 220)'
        />
        <rect
          x={70}
          y={270}
          width={70}
          height={70}
          rx={35}
          transform='rotate(90 70 270)'
        />
        <rect
          x={340}
          width={70}
          height={70}
          rx={35}
          transform='rotate(90 340 0)'
        />
        <rect
          x={610}
          y={600}
          width={70}
          height={70}
          rx={35}
          transform='rotate(-90 610 600)'
        />
        <rect
          x={530}
          y={680}
          width={70}
          height={70}
          rx={35}
          transform='rotate(-90 530 680)'
        />
        <rect
          x={450}
          y={600}
          width={70}
          height={70}
          rx={35}
          transform='rotate(-90 450 600)'
        />
        <rect
          x={530}
          y={520}
          width={70}
          height={70}
          rx={35}
          transform='rotate(-90 530 520)'
        />
        <rect
          x={670}
          y={470}
          width={70}
          height={70}
          rx={35}
          transform='rotate(-90 670 470)'
        />
        <rect
          x={400}
          y={740}
          width={70}
          height={70}
          rx={35}
          transform='rotate(-90 400 740)'
        />
        <rect
          x={600}
          y={130}
          width={70}
          height={70}
          rx={35}
          transform='rotate(180 600 130)'
        />
        <rect
          x={680}
          y={210}
          width={70}
          height={70}
          rx={35}
          transform='rotate(180 680 210)'
        />
        <rect
          x={600}
          y={290}
          width={70}
          height={70}
          rx={35}
          transform='rotate(180 600 290)'
        />
        <rect
          x={520}
          y={210}
          width={70}
          height={70}
          rx={35}
          transform='rotate(180 520 210)'
        />
        <rect
          x={470}
          y={70}
          width={70}
          height={70}
          rx={35}
          transform='rotate(180 470 70)'
        />
        <rect
          x={740}
          y={340}
          width={70}
          height={70}
          rx={35}
          transform='rotate(180 740 340)'
        />
      </g>
    </svg>
  );
};

export default PoddleSvg;
