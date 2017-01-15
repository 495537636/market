package com.loving.market.handler;

import java.io.UnsupportedEncodingException;
import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;
import com.alibaba.fastjson.JSONObject;

public class JsonTypeHandler extends BaseTypeHandler<Object> {

	@Override
    public void setNonNullParameter(PreparedStatement ps, int i, Object parameter, JdbcType jdbcType) throws SQLException {
        String s = null;
        try {
            s = new String(JSONObject.toJSONString(parameter).getBytes("ISO-8859-1"), "UTF-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        ps.setString(i, s);
    }

    @Override
    public Object getNullableResult(ResultSet rs, String columnName) throws SQLException {
        String ret = null;
        try {
            ret = new String(rs.getString(columnName).getBytes("ISO-8859-1"), "UTF-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        Object r = null;
        try{
            r = (ret==null ? new JSONObject() : JSONObject.parseObject(ret, JSONObject.class));
        }catch (Exception e){
            e.printStackTrace();
        }

        return r;
    }

    @Override
    public Object getNullableResult(ResultSet rs, int columnIndex) throws SQLException {
        String ret = null;
        try {
            ret = new String(rs.getString(columnIndex).getBytes("ISO-8859-1"), "UTF-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        Object r = null;
        try{
            r = (ret==null ? new JSONObject() : JSONObject.parseObject(ret, JSONObject.class));
        }catch (Exception e){
            e.printStackTrace();
        }

        return r;
    }

    @Override
    public Object getNullableResult(CallableStatement cs, int columnIndex) throws SQLException {
        String ret = null;
        try {
            ret = new String(cs.getString(columnIndex).getBytes("ISO-8859-1"), "UTF-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        Object r = null;
        try{
            r = (ret==null ? new JSONObject() : JSONObject.parseObject(ret, JSONObject.class));
        }catch (Exception e){
            e.printStackTrace();
        }

        return r;
    }

}
