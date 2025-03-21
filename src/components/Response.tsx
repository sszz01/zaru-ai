import React from "react";

interface ResponseProps {
  response: string;
  loading: boolean;
}

const Response: React.FC<ResponseProps> = ({ response, loading }) => (
  <>
    {loading && <p>Loading...</p>}
    {response && (
      <p>
        <strong>Response:</strong> {response}
      </p>
    )}
  </>
);

export default Response;
