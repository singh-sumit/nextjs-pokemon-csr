import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/Details.module.css'

export default function Details() {
    const {
        query: { id }
    } = useRouter();

    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        async function getPokemon() {
            const resp = await fetch(`https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${id}.json`)
            setPokemon(await resp.json())
        }
        if (id) {
            getPokemon()
        }
    }, [id])

    if (!pokemon) {
        return null;
    }

    return (
        <div>
            <Head>
                <title>{pokemon.name}</title>
            </Head>
            <main>
                <div>
                    <Link href='/'>
                        <a>Back to Home</a>
                    </Link>
                </div>

                <div className={styles.layout}>
                    <div>
                        <img
                            className={styles.picture}
                            src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
                            alt={pokemon.name.english}
                        />
                    </div>
                    <div>
                        {JSON.stringify(pokemon)}
                    </div>
                    <div>
                        <h4
                            className={styles.heading}
                        >{pokemon.name}</h4>

                        <h5>stats :</h5>
                        <table border={1}>
                            <thead>
                                {
                                    ['name', 'value'].map((head) =>
                                        <th>{head}</th>
                                    )
                                }
                            </thead>
                            <tbody>
                                {
                                    pokemon.stats.map((stat) => {
                                        return <tr>
                                            <td>{stat.name}</td>
                                            <td>{stat.value}</td>
                                        </tr>
                                    }
                                    )
                                }
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td>image</td>
                                    <td>{pokemon.image}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    )
}