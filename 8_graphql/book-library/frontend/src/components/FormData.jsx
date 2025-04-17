import { types } from "../util/formDataTypes"

const FormData = ({ data, type }) => {
    if (!data) {
        return null
    }
    
    return (
        <>
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th></th>
                            <th>{type === types.author ? types.book : types.author}</th>
                            <th>{type === types.author ? 'Born' : 'Published'}</th>
                        </tr>
                        {data.map((a) => (
                            <tr key={a.id}>
                                <td>{type === types.author ? a.name : a.title}</td>
                                <td>{type === types.author ? a.born: a.author.name}</td>
                                <td>{type === types.author ? a.bookCount : a.published}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default FormData