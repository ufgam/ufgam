import MDSpinner from 'react-md-spinner';

export default function Loader() {
  return (
    <MDSpinner
      singleColor="#03a9f4"
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
      }}
      aria-label="Loading..."
      size={100}
    />
  );
}
