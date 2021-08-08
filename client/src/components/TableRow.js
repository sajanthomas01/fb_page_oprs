import React from "react";
import Button from 'react-bootstrap/Button';

export default function TableRow({ data, updateFb }) {
  if (data && data?.getConnectedFbPages?.pageInfo?.length) {
    return (<tr key={+new Date()}>
      {data.getConnectedFbPages.pageInfo.map((page) =>
        <React.Fragment key={+new Date()}>
          <td></td>
          <td>Facebook</td>
          <td>{page.name}</td>
          <td>{page?.location?.zip} {page?.location?.street}, {page?.location?.city}</td>
          <td>{page.phone}</td>
          <td>{page.rating_count}/5</td>
          <td>{page.is_permanently_closed ? "No" : "Yes"}</td>
          <td>{page.is_permanently_closed ? "❌" : "✔️"}</td>
          <td>
            <Button
             onClick={()=>updateFb(page)}
              variant="primary">
              Update
            </Button>
          </td>
        </React.Fragment>
      )}
    </tr>);
  }
  return null;
}