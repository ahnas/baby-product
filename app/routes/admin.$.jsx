import { Admin, Resource, ListGuesser } from "react-admin";


export default function App() {
  return (
    <Admin basename="/admin" >
      <Resource name="posts" list={ListGuesser} />
      <Resource name="comments" list={ListGuesser} />
    </Admin>
  );
}