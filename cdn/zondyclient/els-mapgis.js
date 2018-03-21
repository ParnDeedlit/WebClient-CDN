var uri_type = "http://";
var uri_division = "/";
var uri_sub = ":";
var uri_socket = "8020";
var uri_body_end = "?";
var uri_param_link = "&";

var els_name = "es";
var els_query = "generalQuery";
var els_index = "indexName=";
var els_type = "typeName=";
var els_spatial = "spatialCondition=";
var els_time_comdition = "timeCondition=";
var els_query_field = "queryField=";
var els_param_sub = ":";

/*
http://192.168.17.237:8080/es/generalQuery?indexName=df_history&typeName=2017-12-17
&spatialCondition=polygon:29.8439,121,5894;33,5194,107,9816;34.3662,108.3814
&timeCondition=&queryField=imei
*/
function getRangeIdsUri(ip, socket, db, table, spatial_type, spatial_options, id_field){
  var uri;
  uri = "http://" + ip + uri_sub + socket + uri_division
    + els_name + uri_division
    + els_query + uri_body_end
    + els_index + db + uri_param_link
    + els_type + table + uri_param_link
    + els_spatial + spatial_type + els_param_sub + spatial_options + uri_param_link
    + els_time_comdition + uri_param_link
    + els_query_field + id_field;
    return uri;
}
