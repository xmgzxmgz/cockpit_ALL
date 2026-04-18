--
-- PostgreSQL database dump
--

\restrict h8GNUtSUaTSSuv1eZU7UM6wc66C44qbKEBNecwaZnzUiRV969lCK8prxk5zt5WS

-- Dumped from database version 15.17
-- Dumped by pg_dump version 15.17

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: alert_rules; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.alert_rules (
    id integer NOT NULL,
    feature_code character varying(20),
    rule_name character varying(255),
    comparator character varying(10),
    threshold numeric,
    duration_minutes integer DEFAULT 0,
    enabled boolean DEFAULT true,
    severity character varying(50) DEFAULT 'warning'::character varying
);


ALTER TABLE public.alert_rules OWNER TO "user";

--
-- Name: alert_rules_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.alert_rules_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.alert_rules_id_seq OWNER TO "user";

--
-- Name: alert_rules_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.alert_rules_id_seq OWNED BY public.alert_rules.id;


--
-- Name: alerts; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.alerts (
    id integer NOT NULL,
    feature_code character varying(20),
    rule_id integer,
    title character varying(255),
    message text,
    severity character varying(50),
    status character varying(50) DEFAULT 'active'::character varying,
    triggered_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    resolved_at timestamp without time zone
);


ALTER TABLE public.alerts OWNER TO "user";

--
-- Name: alerts_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.alerts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.alerts_id_seq OWNER TO "user";

--
-- Name: alerts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.alerts_id_seq OWNED BY public.alerts.id;


--
-- Name: application_metrics; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.application_metrics (
    id integer NOT NULL,
    app_name character varying(100),
    metric_key character varying(100),
    metric_value character varying(100),
    unit character varying(20),
    recorded_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.application_metrics OWNER TO "user";

--
-- Name: application_metrics_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.application_metrics_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.application_metrics_id_seq OWNER TO "user";

--
-- Name: application_metrics_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.application_metrics_id_seq OWNED BY public.application_metrics.id;


--
-- Name: area_frame_config; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.area_frame_config (
    id integer NOT NULL,
    room_id character varying(50) NOT NULL,
    frame_id character varying(50) NOT NULL,
    label character varying(100),
    rack_range text,
    color character varying(50),
    border_width integer,
    label_position character varying(20),
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.area_frame_config OWNER TO "user";

--
-- Name: area_frame_config_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.area_frame_config_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.area_frame_config_id_seq OWNER TO "user";

--
-- Name: area_frame_config_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.area_frame_config_id_seq OWNED BY public.area_frame_config.id;


--
-- Name: cabinet_config; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.cabinet_config (
    id integer NOT NULL,
    room_id character varying(50) NOT NULL,
    cabinet_id integer NOT NULL,
    col_position integer NOT NULL,
    row_position integer NOT NULL,
    enterprise character varying(255),
    enabled boolean,
    color character varying(50),
    is_hidden boolean,
    visible_index integer,
    name character varying(255),
    maintainer character varying(100),
    manager character varying(100),
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.cabinet_config OWNER TO "user";

--
-- Name: cabinet_config_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.cabinet_config_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cabinet_config_id_seq OWNER TO "user";

--
-- Name: cabinet_config_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.cabinet_config_id_seq OWNED BY public.cabinet_config.id;


--
-- Name: cabinet_grid; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.cabinet_grid (
    id integer NOT NULL,
    room_id integer,
    grid_x integer NOT NULL,
    grid_y integer NOT NULL,
    is_occupied boolean DEFAULT false,
    cabinet_id integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.cabinet_grid OWNER TO "user";

--
-- Name: cabinet_grid_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.cabinet_grid_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cabinet_grid_id_seq OWNER TO "user";

--
-- Name: cabinet_grid_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.cabinet_grid_id_seq OWNED BY public.cabinet_grid.id;


--
-- Name: cabinet_layout; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.cabinet_layout (
    id integer NOT NULL,
    room_id integer,
    layout_type character varying(50) DEFAULT 'row'::character varying,
    columns integer DEFAULT 10,
    rows integer DEFAULT 10,
    spacing double precision DEFAULT 1.0,
    start_position_x double precision DEFAULT 0,
    start_position_y double precision DEFAULT 0,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.cabinet_layout OWNER TO "user";

--
-- Name: cabinet_layout_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.cabinet_layout_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cabinet_layout_id_seq OWNER TO "user";

--
-- Name: cabinet_layout_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.cabinet_layout_id_seq OWNED BY public.cabinet_layout.id;


--
-- Name: cabinet_layout_order; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.cabinet_layout_order (
    id integer NOT NULL,
    room_id character varying(50) NOT NULL,
    original_order json NOT NULL,
    shuffled_order json NOT NULL,
    shuffle_seed character varying(100),
    is_active boolean,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.cabinet_layout_order OWNER TO "user";

--
-- Name: cabinet_layout_order_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.cabinet_layout_order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cabinet_layout_order_id_seq OWNER TO "user";

--
-- Name: cabinet_layout_order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.cabinet_layout_order_id_seq OWNED BY public.cabinet_layout_order.id;


--
-- Name: cabinets; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.cabinets (
    id integer NOT NULL,
    room_id character varying(50),
    enterprise_id integer,
    cabinet_label character varying(50) NOT NULL,
    status character varying(50) DEFAULT 'active'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.cabinets OWNER TO "user";

--
-- Name: cabinets_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.cabinets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cabinets_id_seq OWNER TO "user";

--
-- Name: cabinets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.cabinets_id_seq OWNED BY public.cabinets.id;


--
-- Name: data_center_config; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.data_center_config (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    floor_count integer DEFAULT 1,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.data_center_config OWNER TO "user";

--
-- Name: data_center_config_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.data_center_config_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.data_center_config_id_seq OWNER TO "user";

--
-- Name: data_center_config_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.data_center_config_id_seq OWNED BY public.data_center_config.id;


--
-- Name: db_backup_record; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.db_backup_record (
    id integer NOT NULL,
    backup_name character varying(255) NOT NULL,
    backup_path character varying(500),
    backup_type character varying(50),
    backup_size bigint,
    checksum character varying(128),
    created_at timestamp without time zone,
    description text
);


ALTER TABLE public.db_backup_record OWNER TO "user";

--
-- Name: db_backup_record_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.db_backup_record_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.db_backup_record_id_seq OWNER TO "user";

--
-- Name: db_backup_record_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.db_backup_record_id_seq OWNED BY public.db_backup_record.id;


--
-- Name: enterprises; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.enterprises (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    full_name character varying(255),
    maintainer character varying(100),
    manager character varying(100),
    color character varying(50),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.enterprises OWNER TO "user";

--
-- Name: enterprises_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.enterprises_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.enterprises_id_seq OWNER TO "user";

--
-- Name: enterprises_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.enterprises_id_seq OWNED BY public.enterprises.id;


--
-- Name: environment_readings; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.environment_readings (
    id integer NOT NULL,
    room_id character varying(50),
    sensor_type character varying(50),
    value numeric,
    unit character varying(20),
    recorded_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.environment_readings OWNER TO "user";

--
-- Name: environment_readings_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.environment_readings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.environment_readings_id_seq OWNER TO "user";

--
-- Name: environment_readings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.environment_readings_id_seq OWNED BY public.environment_readings.id;


--
-- Name: feature_categories; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.feature_categories (
    id integer NOT NULL,
    code character varying(20) NOT NULL,
    name character varying(100) NOT NULL,
    description text
);


ALTER TABLE public.feature_categories OWNER TO "user";

--
-- Name: feature_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.feature_categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.feature_categories_id_seq OWNER TO "user";

--
-- Name: feature_categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.feature_categories_id_seq OWNED BY public.feature_categories.id;


--
-- Name: feature_metrics; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.feature_metrics (
    id integer NOT NULL,
    feature_code character varying(20),
    metric_key character varying(100),
    metric_value character varying(100),
    unit character varying(50),
    collected_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.feature_metrics OWNER TO "user";

--
-- Name: feature_metrics_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.feature_metrics_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.feature_metrics_id_seq OWNER TO "user";

--
-- Name: feature_metrics_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.feature_metrics_id_seq OWNED BY public.feature_metrics.id;


--
-- Name: firmware_inventory; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.firmware_inventory (
    id integer NOT NULL,
    device_name character varying(100),
    device_type character varying(100),
    firmware_version character varying(100),
    last_checked timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.firmware_inventory OWNER TO "user";

--
-- Name: firmware_inventory_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.firmware_inventory_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.firmware_inventory_id_seq OWNER TO "user";

--
-- Name: firmware_inventory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.firmware_inventory_id_seq OWNED BY public.firmware_inventory.id;


--
-- Name: floor_config; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.floor_config (
    id integer NOT NULL,
    data_center_id integer,
    floor_number integer NOT NULL,
    floor_name character varying(100),
    shape character varying(50) DEFAULT 'rectangle'::character varying,
    width double precision DEFAULT 100,
    depth double precision DEFAULT 100,
    room_count integer DEFAULT 0,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.floor_config OWNER TO "user";

--
-- Name: floor_config_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.floor_config_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.floor_config_id_seq OWNER TO "user";

--
-- Name: floor_config_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.floor_config_id_seq OWNED BY public.floor_config.id;


--
-- Name: inspection_reports; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.inspection_reports (
    id integer NOT NULL,
    report_date date,
    summary text,
    file_url character varying(255)
);


ALTER TABLE public.inspection_reports OWNER TO "user";

--
-- Name: inspection_reports_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.inspection_reports_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.inspection_reports_id_seq OWNER TO "user";

--
-- Name: inspection_reports_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.inspection_reports_id_seq OWNED BY public.inspection_reports.id;


--
-- Name: knowledge_base_links; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.knowledge_base_links (
    id integer NOT NULL,
    feature_code character varying(20),
    title character varying(255),
    url character varying(255)
);


ALTER TABLE public.knowledge_base_links OWNER TO "user";

--
-- Name: knowledge_base_links_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.knowledge_base_links_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.knowledge_base_links_id_seq OWNER TO "user";

--
-- Name: knowledge_base_links_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.knowledge_base_links_id_seq OWNED BY public.knowledge_base_links.id;


--
-- Name: maintenance_assets; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.maintenance_assets (
    id integer NOT NULL,
    asset_name character varying(100),
    asset_type character varying(100),
    warranty_expiry date
);


ALTER TABLE public.maintenance_assets OWNER TO "user";

--
-- Name: maintenance_assets_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.maintenance_assets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.maintenance_assets_id_seq OWNER TO "user";

--
-- Name: maintenance_assets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.maintenance_assets_id_seq OWNED BY public.maintenance_assets.id;


--
-- Name: monitoring_features; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.monitoring_features (
    id integer NOT NULL,
    code character varying(20) NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    category_code character varying(20),
    enabled boolean DEFAULT true,
    status character varying(50) DEFAULT 'normal'::character varying,
    severity character varying(50) DEFAULT 'info'::character varying,
    unit character varying(50),
    latest_value character varying(100),
    config json,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.monitoring_features OWNER TO "user";

--
-- Name: monitoring_features_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.monitoring_features_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.monitoring_features_id_seq OWNER TO "user";

--
-- Name: monitoring_features_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.monitoring_features_id_seq OWNED BY public.monitoring_features.id;


--
-- Name: network_metrics; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.network_metrics (
    id integer NOT NULL,
    link_name character varying(100),
    metric_key character varying(100),
    metric_value character varying(100),
    unit character varying(20),
    recorded_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.network_metrics OWNER TO "user";

--
-- Name: network_metrics_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.network_metrics_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.network_metrics_id_seq OWNER TO "user";

--
-- Name: network_metrics_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.network_metrics_id_seq OWNED BY public.network_metrics.id;


--
-- Name: oncall_schedules; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.oncall_schedules (
    id integer NOT NULL,
    name character varying(100),
    duty_user character varying(100),
    days character varying(50),
    start_time character varying(20),
    end_time character varying(20)
);


ALTER TABLE public.oncall_schedules OWNER TO "user";

--
-- Name: oncall_schedules_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.oncall_schedules_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.oncall_schedules_id_seq OWNER TO "user";

--
-- Name: oncall_schedules_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.oncall_schedules_id_seq OWNED BY public.oncall_schedules.id;


--
-- Name: power_events; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.power_events (
    id integer NOT NULL,
    room_id character varying(50),
    event_type character varying(100),
    severity character varying(50),
    detail text,
    occurred_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.power_events OWNER TO "user";

--
-- Name: power_events_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.power_events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.power_events_id_seq OWNER TO "user";

--
-- Name: power_events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.power_events_id_seq OWNED BY public.power_events.id;


--
-- Name: resource_overview; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.resource_overview (
    id integer NOT NULL,
    total_servers integer DEFAULT 0,
    total_it_cabinet_count integer DEFAULT 0,
    total_enterprise_count integer DEFAULT 0,
    should_bill_cabinets integer DEFAULT 0,
    billed_cabinets integer DEFAULT 0,
    reserved_cabinets integer DEFAULT 0,
    available_cabinets integer DEFAULT 0,
    customer_cabinets integer DEFAULT 0,
    self_use_cabinets integer DEFAULT 0,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.resource_overview OWNER TO "user";

--
-- Name: resource_overview_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.resource_overview_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.resource_overview_id_seq OWNER TO "user";

--
-- Name: resource_overview_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.resource_overview_id_seq OWNED BY public.resource_overview.id;


--
-- Name: room_config; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.room_config (
    id integer NOT NULL,
    floor_id integer,
    room_number integer NOT NULL,
    room_name character varying(100),
    shape character varying(50) DEFAULT 'rectangle'::character varying,
    color character varying(50) DEFAULT '#6b7280'::character varying,
    cabinet_count integer DEFAULT 0,
    position_x double precision DEFAULT 0,
    position_y double precision DEFAULT 0,
    position_z double precision DEFAULT 0,
    rotation double precision DEFAULT 0,
    width double precision DEFAULT 50,
    depth double precision DEFAULT 50,
    height double precision DEFAULT 30,
    is_enabled boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.room_config OWNER TO "user";

--
-- Name: room_config_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.room_config_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.room_config_id_seq OWNER TO "user";

--
-- Name: room_config_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.room_config_id_seq OWNED BY public.room_config.id;


--
-- Name: room_layout_config; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.room_layout_config (
    id integer NOT NULL,
    room_id character varying(50) NOT NULL,
    room_name character varying(100),
    cols integer,
    rows integer,
    max_racks integer,
    default_color character varying(50),
    is_clickable boolean,
    is_hover_animation_enabled boolean,
    hover_duration integer,
    hover_easing character varying(50),
    hover_scale double precision,
    hover_shadow_intensity double precision,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.room_layout_config OWNER TO "user";

--
-- Name: room_layout_config_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.room_layout_config_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.room_layout_config_id_seq OWNER TO "user";

--
-- Name: room_layout_config_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.room_layout_config_id_seq OWNED BY public.room_layout_config.id;


--
-- Name: rooms; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.rooms (
    id character varying(50) NOT NULL,
    name character varying(100) NOT NULL,
    location character varying(255),
    cols integer DEFAULT 30,
    rows integer DEFAULT 22,
    max_racks integer,
    status character varying(50) DEFAULT 'active'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    is_enabled boolean DEFAULT true
);


ALTER TABLE public.rooms OWNER TO "user";

--
-- Name: security_events; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.security_events (
    id integer NOT NULL,
    event_type character varying(100),
    severity character varying(50),
    detail text,
    occurred_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.security_events OWNER TO "user";

--
-- Name: security_events_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.security_events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.security_events_id_seq OWNER TO "user";

--
-- Name: security_events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.security_events_id_seq OWNED BY public.security_events.id;


--
-- Name: server_metrics; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.server_metrics (
    id integer NOT NULL,
    server_name character varying(100),
    metric_key character varying(100),
    metric_value character varying(100),
    unit character varying(20),
    recorded_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.server_metrics OWNER TO "user";

--
-- Name: server_metrics_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.server_metrics_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.server_metrics_id_seq OWNER TO "user";

--
-- Name: server_metrics_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.server_metrics_id_seq OWNED BY public.server_metrics.id;


--
-- Name: alert_rules id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.alert_rules ALTER COLUMN id SET DEFAULT nextval('public.alert_rules_id_seq'::regclass);


--
-- Name: alerts id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.alerts ALTER COLUMN id SET DEFAULT nextval('public.alerts_id_seq'::regclass);


--
-- Name: application_metrics id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.application_metrics ALTER COLUMN id SET DEFAULT nextval('public.application_metrics_id_seq'::regclass);


--
-- Name: area_frame_config id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.area_frame_config ALTER COLUMN id SET DEFAULT nextval('public.area_frame_config_id_seq'::regclass);


--
-- Name: cabinet_config id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.cabinet_config ALTER COLUMN id SET DEFAULT nextval('public.cabinet_config_id_seq'::regclass);


--
-- Name: cabinet_grid id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.cabinet_grid ALTER COLUMN id SET DEFAULT nextval('public.cabinet_grid_id_seq'::regclass);


--
-- Name: cabinet_layout id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.cabinet_layout ALTER COLUMN id SET DEFAULT nextval('public.cabinet_layout_id_seq'::regclass);


--
-- Name: cabinet_layout_order id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.cabinet_layout_order ALTER COLUMN id SET DEFAULT nextval('public.cabinet_layout_order_id_seq'::regclass);


--
-- Name: cabinets id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.cabinets ALTER COLUMN id SET DEFAULT nextval('public.cabinets_id_seq'::regclass);


--
-- Name: data_center_config id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.data_center_config ALTER COLUMN id SET DEFAULT nextval('public.data_center_config_id_seq'::regclass);


--
-- Name: db_backup_record id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.db_backup_record ALTER COLUMN id SET DEFAULT nextval('public.db_backup_record_id_seq'::regclass);


--
-- Name: enterprises id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.enterprises ALTER COLUMN id SET DEFAULT nextval('public.enterprises_id_seq'::regclass);


--
-- Name: environment_readings id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.environment_readings ALTER COLUMN id SET DEFAULT nextval('public.environment_readings_id_seq'::regclass);


--
-- Name: feature_categories id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.feature_categories ALTER COLUMN id SET DEFAULT nextval('public.feature_categories_id_seq'::regclass);


--
-- Name: feature_metrics id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.feature_metrics ALTER COLUMN id SET DEFAULT nextval('public.feature_metrics_id_seq'::regclass);


--
-- Name: firmware_inventory id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.firmware_inventory ALTER COLUMN id SET DEFAULT nextval('public.firmware_inventory_id_seq'::regclass);


--
-- Name: floor_config id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.floor_config ALTER COLUMN id SET DEFAULT nextval('public.floor_config_id_seq'::regclass);


--
-- Name: inspection_reports id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.inspection_reports ALTER COLUMN id SET DEFAULT nextval('public.inspection_reports_id_seq'::regclass);


--
-- Name: knowledge_base_links id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.knowledge_base_links ALTER COLUMN id SET DEFAULT nextval('public.knowledge_base_links_id_seq'::regclass);


--
-- Name: maintenance_assets id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.maintenance_assets ALTER COLUMN id SET DEFAULT nextval('public.maintenance_assets_id_seq'::regclass);


--
-- Name: monitoring_features id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.monitoring_features ALTER COLUMN id SET DEFAULT nextval('public.monitoring_features_id_seq'::regclass);


--
-- Name: network_metrics id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.network_metrics ALTER COLUMN id SET DEFAULT nextval('public.network_metrics_id_seq'::regclass);


--
-- Name: oncall_schedules id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.oncall_schedules ALTER COLUMN id SET DEFAULT nextval('public.oncall_schedules_id_seq'::regclass);


--
-- Name: power_events id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.power_events ALTER COLUMN id SET DEFAULT nextval('public.power_events_id_seq'::regclass);


--
-- Name: resource_overview id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.resource_overview ALTER COLUMN id SET DEFAULT nextval('public.resource_overview_id_seq'::regclass);


--
-- Name: room_config id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.room_config ALTER COLUMN id SET DEFAULT nextval('public.room_config_id_seq'::regclass);


--
-- Name: room_layout_config id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.room_layout_config ALTER COLUMN id SET DEFAULT nextval('public.room_layout_config_id_seq'::regclass);


--
-- Name: security_events id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.security_events ALTER COLUMN id SET DEFAULT nextval('public.security_events_id_seq'::regclass);


--
-- Name: server_metrics id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.server_metrics ALTER COLUMN id SET DEFAULT nextval('public.server_metrics_id_seq'::regclass);


--
-- Name: alert_rules alert_rules_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.alert_rules
    ADD CONSTRAINT alert_rules_pkey PRIMARY KEY (id);


--
-- Name: alerts alerts_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.alerts
    ADD CONSTRAINT alerts_pkey PRIMARY KEY (id);


--
-- Name: application_metrics application_metrics_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.application_metrics
    ADD CONSTRAINT application_metrics_pkey PRIMARY KEY (id);


--
-- Name: area_frame_config area_frame_config_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.area_frame_config
    ADD CONSTRAINT area_frame_config_pkey PRIMARY KEY (id);


--
-- Name: cabinet_config cabinet_config_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.cabinet_config
    ADD CONSTRAINT cabinet_config_pkey PRIMARY KEY (id);


--
-- Name: cabinet_grid cabinet_grid_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.cabinet_grid
    ADD CONSTRAINT cabinet_grid_pkey PRIMARY KEY (id);


--
-- Name: cabinet_layout_order cabinet_layout_order_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.cabinet_layout_order
    ADD CONSTRAINT cabinet_layout_order_pkey PRIMARY KEY (id);


--
-- Name: cabinet_layout cabinet_layout_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.cabinet_layout
    ADD CONSTRAINT cabinet_layout_pkey PRIMARY KEY (id);


--
-- Name: cabinets cabinets_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.cabinets
    ADD CONSTRAINT cabinets_pkey PRIMARY KEY (id);


--
-- Name: cabinets cabinets_room_id_cabinet_label_key; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.cabinets
    ADD CONSTRAINT cabinets_room_id_cabinet_label_key UNIQUE (room_id, cabinet_label);


--
-- Name: data_center_config data_center_config_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.data_center_config
    ADD CONSTRAINT data_center_config_pkey PRIMARY KEY (id);


--
-- Name: db_backup_record db_backup_record_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.db_backup_record
    ADD CONSTRAINT db_backup_record_pkey PRIMARY KEY (id);


--
-- Name: enterprises enterprises_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.enterprises
    ADD CONSTRAINT enterprises_pkey PRIMARY KEY (id);


--
-- Name: environment_readings environment_readings_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.environment_readings
    ADD CONSTRAINT environment_readings_pkey PRIMARY KEY (id);


--
-- Name: feature_categories feature_categories_code_key; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.feature_categories
    ADD CONSTRAINT feature_categories_code_key UNIQUE (code);


--
-- Name: feature_categories feature_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.feature_categories
    ADD CONSTRAINT feature_categories_pkey PRIMARY KEY (id);


--
-- Name: feature_metrics feature_metrics_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.feature_metrics
    ADD CONSTRAINT feature_metrics_pkey PRIMARY KEY (id);


--
-- Name: firmware_inventory firmware_inventory_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.firmware_inventory
    ADD CONSTRAINT firmware_inventory_pkey PRIMARY KEY (id);


--
-- Name: floor_config floor_config_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.floor_config
    ADD CONSTRAINT floor_config_pkey PRIMARY KEY (id);


--
-- Name: inspection_reports inspection_reports_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.inspection_reports
    ADD CONSTRAINT inspection_reports_pkey PRIMARY KEY (id);


--
-- Name: knowledge_base_links knowledge_base_links_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.knowledge_base_links
    ADD CONSTRAINT knowledge_base_links_pkey PRIMARY KEY (id);


--
-- Name: maintenance_assets maintenance_assets_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.maintenance_assets
    ADD CONSTRAINT maintenance_assets_pkey PRIMARY KEY (id);


--
-- Name: monitoring_features monitoring_features_code_key; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.monitoring_features
    ADD CONSTRAINT monitoring_features_code_key UNIQUE (code);


--
-- Name: monitoring_features monitoring_features_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.monitoring_features
    ADD CONSTRAINT monitoring_features_pkey PRIMARY KEY (id);


--
-- Name: network_metrics network_metrics_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.network_metrics
    ADD CONSTRAINT network_metrics_pkey PRIMARY KEY (id);


--
-- Name: oncall_schedules oncall_schedules_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.oncall_schedules
    ADD CONSTRAINT oncall_schedules_pkey PRIMARY KEY (id);


--
-- Name: power_events power_events_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.power_events
    ADD CONSTRAINT power_events_pkey PRIMARY KEY (id);


--
-- Name: resource_overview resource_overview_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.resource_overview
    ADD CONSTRAINT resource_overview_pkey PRIMARY KEY (id);


--
-- Name: room_config room_config_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.room_config
    ADD CONSTRAINT room_config_pkey PRIMARY KEY (id);


--
-- Name: room_layout_config room_layout_config_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.room_layout_config
    ADD CONSTRAINT room_layout_config_pkey PRIMARY KEY (id);


--
-- Name: room_layout_config room_layout_config_room_id_key; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.room_layout_config
    ADD CONSTRAINT room_layout_config_room_id_key UNIQUE (room_id);


--
-- Name: rooms rooms_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.rooms
    ADD CONSTRAINT rooms_pkey PRIMARY KEY (id);


--
-- Name: security_events security_events_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.security_events
    ADD CONSTRAINT security_events_pkey PRIMARY KEY (id);


--
-- Name: server_metrics server_metrics_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.server_metrics
    ADD CONSTRAINT server_metrics_pkey PRIMARY KEY (id);


--
-- Name: cabinet_layout_order uix_room_active; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.cabinet_layout_order
    ADD CONSTRAINT uix_room_active UNIQUE (room_id, is_active);


--
-- Name: cabinet_config uix_room_cabinet; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.cabinet_config
    ADD CONSTRAINT uix_room_cabinet UNIQUE (room_id, cabinet_id);


--
-- Name: area_frame_config uix_room_frame; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.area_frame_config
    ADD CONSTRAINT uix_room_frame UNIQUE (room_id, frame_id);


--
-- Name: ix_area_frame_config_id; Type: INDEX; Schema: public; Owner: user
--

CREATE INDEX ix_area_frame_config_id ON public.area_frame_config USING btree (id);


--
-- Name: ix_cabinet_config_id; Type: INDEX; Schema: public; Owner: user
--

CREATE INDEX ix_cabinet_config_id ON public.cabinet_config USING btree (id);


--
-- Name: ix_cabinet_layout_order_id; Type: INDEX; Schema: public; Owner: user
--

CREATE INDEX ix_cabinet_layout_order_id ON public.cabinet_layout_order USING btree (id);


--
-- Name: ix_db_backup_record_id; Type: INDEX; Schema: public; Owner: user
--

CREATE INDEX ix_db_backup_record_id ON public.db_backup_record USING btree (id);


--
-- Name: ix_room_layout_config_id; Type: INDEX; Schema: public; Owner: user
--

CREATE INDEX ix_room_layout_config_id ON public.room_layout_config USING btree (id);


--
-- Name: alert_rules alert_rules_feature_code_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.alert_rules
    ADD CONSTRAINT alert_rules_feature_code_fkey FOREIGN KEY (feature_code) REFERENCES public.monitoring_features(code);


--
-- Name: alerts alerts_feature_code_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.alerts
    ADD CONSTRAINT alerts_feature_code_fkey FOREIGN KEY (feature_code) REFERENCES public.monitoring_features(code);


--
-- Name: alerts alerts_rule_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.alerts
    ADD CONSTRAINT alerts_rule_id_fkey FOREIGN KEY (rule_id) REFERENCES public.alert_rules(id);


--
-- Name: cabinet_grid cabinet_grid_room_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.cabinet_grid
    ADD CONSTRAINT cabinet_grid_room_id_fkey FOREIGN KEY (room_id) REFERENCES public.room_config(id);


--
-- Name: cabinet_layout cabinet_layout_room_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.cabinet_layout
    ADD CONSTRAINT cabinet_layout_room_id_fkey FOREIGN KEY (room_id) REFERENCES public.room_config(id);


--
-- Name: cabinets cabinets_enterprise_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.cabinets
    ADD CONSTRAINT cabinets_enterprise_id_fkey FOREIGN KEY (enterprise_id) REFERENCES public.enterprises(id);


--
-- Name: cabinets cabinets_room_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.cabinets
    ADD CONSTRAINT cabinets_room_id_fkey FOREIGN KEY (room_id) REFERENCES public.rooms(id);


--
-- Name: feature_metrics feature_metrics_feature_code_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.feature_metrics
    ADD CONSTRAINT feature_metrics_feature_code_fkey FOREIGN KEY (feature_code) REFERENCES public.monitoring_features(code);


--
-- Name: floor_config floor_config_data_center_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.floor_config
    ADD CONSTRAINT floor_config_data_center_id_fkey FOREIGN KEY (data_center_id) REFERENCES public.data_center_config(id);


--
-- Name: knowledge_base_links knowledge_base_links_feature_code_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.knowledge_base_links
    ADD CONSTRAINT knowledge_base_links_feature_code_fkey FOREIGN KEY (feature_code) REFERENCES public.monitoring_features(code);


--
-- Name: monitoring_features monitoring_features_category_code_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.monitoring_features
    ADD CONSTRAINT monitoring_features_category_code_fkey FOREIGN KEY (category_code) REFERENCES public.feature_categories(code);


--
-- Name: room_config room_config_floor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.room_config
    ADD CONSTRAINT room_config_floor_id_fkey FOREIGN KEY (floor_id) REFERENCES public.floor_config(id);


--
-- PostgreSQL database dump complete
--

\unrestrict h8GNUtSUaTSSuv1eZU7UM6wc66C44qbKEBNecwaZnzUiRV969lCK8prxk5zt5WS

