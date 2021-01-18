import Skeleton from 'react-loading-skeleton';

function Loader() {
  return (
    <div style={{ fontSize: 20, lineHeight: 2 }}>
      <h1>{<Skeleton />}</h1>
      {<Skeleton count={10} />}
    </div>
  );
}

export default Loader