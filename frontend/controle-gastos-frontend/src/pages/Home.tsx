import Header from "../components/Header/Header";
import PersonForm from "../components/PersonForm/PersonForm";
import PersonList from "../components/PersonList/PersonList";

function Home() {

    return (
        <>
            <Header />
            <PersonForm />
            <PersonList />
        </>
    );
}

export default Home;