import elasticsearch from 'elasticsearch';

export default elasticsearch.Client({
	host: "http://127.0.0.1:9200"
});