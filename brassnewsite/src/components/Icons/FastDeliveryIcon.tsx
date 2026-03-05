const FastDeliveryIcon = ({ size = 48, color = "currentColor" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      stroke={color}
      strokeWidth="16"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Clock */}
      <circle cx="210" cy="150" r="90" />
      <line x1="210" y1="150" x2="260" y2="110" />
      <line x1="210" y1="150" x2="180" y2="180" />

      {/* Speed lines */}
      <line x1="20" y1="220" x2="110" y2="220" />
      <line x1="40" y1="260" x2="120" y2="260" />
      <line x1="70" y1="300" x2="140" y2="300" />

      {/* Truck base */}
      <path d="M150 300 L330 300 L360 260 L430 260 L430 330 L150 330 Z" />

      {/* Truck cabin */}
      <path d="M330 300 L330 220 L390 220 L430 260" />

      {/* Wheels */}
      <circle cx="220" cy="330" r="25" />
      <circle cx="390" cy="330" r="25" />
    </svg>
  );
};

export default FastDeliveryIcon;