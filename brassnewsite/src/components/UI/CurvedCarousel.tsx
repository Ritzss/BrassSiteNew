import Image from "next/image";
import Link from "next/link";

export default function PipeSection({items}:{items?:string[]}) {
  items = [
    "/Demo/Images/image.png",
    "/Demo/Images/image.png",
    "/Demo/Images/image.png",
    "/Demo/Images/image.png",
  ];

  return (
    <div className="pipeContainer">
      <svg width="0" height="0">
        <clipPath id="pipeClip" clipPathUnits="objectBoundingBox">
          <path d=" M0,0 C0.20,0.15 0.80,0.15 1,0 L1,1 C0.80,0.80 0.20,0.80 0,1 Z" />
        </clipPath>
      </svg>

      <div className="pipeContent">
        <Link href={`/`} className="slider">
          {[...items, ...items, ...items].map((item, i) => (
            <Image
              key={i}
              src={item}
              alt="image"
              width={384}
              height={346}
              className="pipeItem"
            />
          ))}
        </Link>
      </div>
    </div>
  );
}