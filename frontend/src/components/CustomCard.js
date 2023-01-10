import { Card } from 'react-bootstrap';

const CustomCard = ({ children, className }) => {
  return (
    <Card
      className={
        className
        ? `rounded shadow p-4 ${className}`
        : "rounded shadow p-4"
      }
    >
      {children}
    </Card>
  );
}

export default CustomCard
