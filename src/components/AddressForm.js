import axios from "axios";
import styled from "styled-components";
import { useState } from "react";

export default function AddressForm({ address, setAddress, setButtonState }) {
    const [showAddressInput, setShowAddressInput] = useState(false);
    
    const UFs = [
        "AC",
        "AL",
        "AP",
        "AM",
        "BA",
        "CE",
        "DF",
        "ES",
        "GO",
        "MA",
        "MT",
        "MS",
        "MG",
        "PA",
        "PB",
        "PR",
        "PE",
        "PI",
        "RJ",
        "RN",
        "RS",
        "RO",
        "RR",
        "SC",
        "SP",
        "SE",
        "TO",
    ];

    function searchCEP(e) {
        e.preventDefault();
        if (address.CEP.length === 8) {
            const promise = axios.get(
                `https://viacep.com.br/ws/${address.CEP}/json/`
            );
            promise.then((res) => {
                if(res.data.erro){
                    alert("CEP inválido!");
                } else{
                    setAddress({
                        CEP: res.data.cep,
                        city: res.data.localidade,
                        UF: res.data.uf,
                        street: res.data.logradouro,
                        district: res.data.bairro,
                        number: "",
                    });
                    setShowAddressInput(true);
                    setButtonState(false);
                }
            });
        } else if (address.UF && address.city && address.street.length > 3) {
            const promise = axios.get(
                `https://viacep.com.br/ws/${address.UF}/${address.city}/${address.street}/json/`
            );
            promise.then((res) => {
                const newAddress = res.data[0];
                setAddress({
                    CEP: newAddress.cep,
                    city: newAddress.localidade,
                    UF: newAddress.uf,
                    street: newAddress.logradouro,
                    district: newAddress.bairro,
                    number: "",
                });
            });
        } else {
            alert("Formato inválido!");
        }
    }

    return (
        <Container>
            <input
                type="text"
                placeholder="CEP (apenas números)"
                value={address.CEP}
                onChange={(e) => setAddress({ ...address, CEP: e.target.value })}
                required
            />
            {showAddressInput ? (
                <>
                    <input
                        type="text"
                        placeholder="Endereço"
                        value={address.street}
                        onChange={(e) =>
                            setAddress({ ...address, street: e.target.value })
                        }
                        required
                    />
                    <input
                        type="text"
                        placeholder="Número/Complemento"
                        value={address.number}
                        onChange={(e) =>
                            setAddress({ ...address, number: e.target.value })
                        }
                    />
                    <input
                        type="text"
                        placeholder="Bairro"
                        value={address.district}
                        onChange={(e) =>
                            setAddress({ ...address, district: e.target.value })
                        }
                    />
                    <input
                        type="text"
                        placeholder="Cidade"
                        value={address.city}
                        onChange={(e) =>
                            setAddress({ ...address, city: e.target.value })
                        }
                        required
                    />
                    <div>
                        <label htmlFor="UF">Estado:</label>
                        <select
                            name="UF"
                            value={address.UF}
                            onChange={(e) =>
                                setAddress({ ...address, UF: e.target.value })
                            }
                            required
                        >
                            {UFs.map((UF) => (
                                <option value={UF} key={UF}>
                                    {UF}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button onClick={(e) => searchCEP(e)} disabled={false} >Pesquisar CEP</button>
                </>
            ) : (
                <div className="address-search">
                    <button onClick={(e) => searchCEP(e)}>
                        Pesquisar endereço
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setShowAddressInput(true);
                        }}
                    >
                        Não sei meu CEP
                    </button>
                </div>
            )}
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    input {
        height: 40px;
        width: 305px;
        margin-bottom: 10px;
        border-radius: 5px;
        border: solid 1px;
        padding: 10px;
        font-size: 16px;
    }

    label {
        margin-right: 20px;
    }

    button{
        width: 305px;
    }

    .address-search {
        margin-top: 10px;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;
