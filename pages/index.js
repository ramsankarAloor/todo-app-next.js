
export async function getServerSideProps(context) {
  return {
    redirect: {
      destination: '/today',
      permanent: false,
    },
  };
}

// This is just a dummy component to avoid rendering an empty page
export default function HomePage() {
  return <div>Redirecting...</div>;
}
