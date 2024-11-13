import { useQuery, gql } from "@apollo/client";

const GET_LAUNCHES = gql`
  query Launches {
    launches(limit: 5) {
      id
      launch_date_utc
      launch_success
      rocket {
        rocket_name
      }
      links {
        video_link
      }
      details
    }
  }
`;
export default function DisplayLocations() {
  const { loading, error, data } = useQuery(GET_LAUNCHES);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error : {error.message} </div>;
  console.log(data.launches);
  return data.launches.map(
    (
      { id, launch_date_utc, launch_success, rocket, links, details },
      index
    ) => (
      <div key={id}>
        <h3>{rocket.rocket_name}</h3>
        <span>{launch_date_utc}</span>
        <br />
        <span>{launch_success}</span>
        <br />
        <p>{details}</p>
        <a href={links.video_link}>{links.video_link}</a>
        <br />
      </div>
    )
  );
}
