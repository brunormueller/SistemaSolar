import Container from "../../components/Forms/Container";
import Input from "../../components/Forms/Input";
import InputGroup from "../../components/Forms/InputGroup";

const ObservaçãoColeta = ({ form }: any) => {
    return (

        <Container>
            <form action="">
                <InputGroup>
                    <Input type="textarea" name="obsColeta" label="Observações Gerais" formulario={form} />
                </InputGroup>
            </form>
        </Container>

    );
}

export default ObservaçãoColeta;