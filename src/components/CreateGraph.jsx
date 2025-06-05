import React, { useEffect, useState } from 'react';
import {
  useCreateGraphMutation,
  useGetGraphsQuery,
} from '../redux/api/graphApi';
import toast from 'react-hot-toast';
import GraphCard from './GraphCard';
import MetaData from './MetaData';

export default function CreateGraph() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const [uploadGraph, { isLoading, error, isSuccess }] =
    useCreateGraphMutation();

  const { data: graphs, isLoading: isLoadingGraphs } = useGetGraphsQuery();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !description || !file) {
      toast.error('Please fill all fields');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('file', file);

    uploadGraph(formData);

    setName('');
    setDescription('');
    setFile(null);
  };

  useEffect(() => {
    if (error) {
      console.log(error);
      toast.error('Error creating graph');
    }

    if (isSuccess) {
      toast.success('Graph created successfully');
    }
  }, [isSuccess, error]);

  return (
    <>
      <MetaData title="Create Graph" />
      <div className="container">
        <form onSubmit={handleSubmit} className="my-4">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="file" className="form-label">
              File
            </label>
            <input
              type="file"
              className="form-control"
              id="file"
              accept=".csv"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Creating...' : 'Create Graph'}
          </button>
        </form>
        {isLoadingGraphs ? (
          <div>Loading...</div>
        ) : (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {graphs?.map((graph) => (
              <div key={graph.id} className="col">
                <GraphCard graph={graph} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
