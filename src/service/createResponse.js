import axios from 'axios';

const BASE_URL =
  'https://64e7a830b0fd9648b7903aa4.mockapi.io/homework07/phonebook/';


export async function getRequest() {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        }
  const { data } = await axios.get(`${BASE_URL}`, options);
  return data;
}

export async function postRequest({name: names, phone: phones}) {
   return await axios({
        method: 'post',
        url: `${BASE_URL}`,
        data: {
          name: names,
          phone: phones
        }
      });
}

export async function deleteRequest(id) {
   return await axios({
        method: 'DELETE',
        url: `${BASE_URL}${id}`,
      });
    }
