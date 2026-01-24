import request from "@/utils/request";

// 定义接口类型
export interface FeatureCategory {
  code: string;
  name: string;
  description: string;
}

export interface MonitoringFeature {
  code: string;
  name: string;
  description?: string;
  category_code: string;
  enabled: boolean;
  status: string;
  severity: string;
  unit?: string;
  latest_value?: string;
  config?: any;
  updated_at?: string;
}

export interface FeatureMetric {
  id: number;
  feature_code: string;
  metric_key: string;
  metric_value: string;
  unit?: string;
  collected_at: string;
}

export interface Alert {
  id: number;
  feature_code: string;
  rule_id?: number;
  title: string;
  message: string;
  severity: string;
  status: string;
  triggered_at: string;
  resolved_at?: string;
}

export interface EnvironmentReading {
  id: number;
  room_id: string;
  sensor_type: string;
  value: number;
  unit: string;
  recorded_at: string;
}

// 获取所有功能分类
export const getFeatureCategories = async () => {
  const response = await request<FeatureCategory[]>({
    url: "/api/feature-categories",
    method: "get",
  });
  return response.data;
};

// 获取所有监控功能
export const getMonitoringFeatures = async (category_code?: string) => {
  const response = await request<MonitoringFeature[]>({
    url: "/api/features",
    method: "get",
    params: { category_code },
  });
  return response.data;
};

// 获取功能详情
export const getFeatureDetail = async (code: string) => {
  const response = await request<MonitoringFeature>({
    url: `/api/features/${code}`,
    method: "get",
  });
  return response.data;
};

// 更新功能状态
export const updateFeatureStatus = async (
  code: string,
  data: Partial<MonitoringFeature>,
) => {
  const response = await request<MonitoringFeature>({
    url: `/api/features/${code}`,
    method: "put",
    data,
  });
  return response.data;
};

// 获取功能的指标历史
export const getFeatureMetrics = async (code: string, limit: number = 10) => {
  const response = await request<FeatureMetric[]>({
    url: `/api/features/${code}/metrics`,
    method: "get",
    params: { limit },
  });
  return response.data;
};

// 提交新的指标数据
export const submitFeatureMetric = async (
  code: string,
  data: { metric_key: string; metric_value: string; unit?: string },
) => {
  const response = await request<FeatureMetric>({
    url: `/api/features/${code}/metrics`,
    method: "post",
    data,
  });
  return response.data;
};

// 获取告警列表
export const getAlerts = async (status?: string) => {
  const response = await request<Alert[]>({
    url: "/api/alerts",
    method: "get",
    params: { status },
  });
  return response.data;
};

// 触发告警
export const triggerAlert = async (data: {
  feature_code: string;
  title: string;
  message: string;
  severity: string;
}) => {
  const response = await request<Alert>({
    url: "/api/alerts",
    method: "post",
    data,
  });
  return response.data;
};

// 发送多渠道通知
export const sendMultiChannelNotification = async (data: {
  feature_code: string;
  message: string;
  severity: string;
  channels: string[];
}) => {
  const response = await request<any>({
    url: "/api/alerting/multi-channel",
    method: "post",
    data,
  });
  return response.data;
};

// 获取指定机房的环境数据
export const getRoomEnvironment = async (roomId: string) => {
  const response = await request<EnvironmentReading[]>({
    url: `/api/environment/room/${roomId}`,
    method: "get",
  });
  return response.data;
};

// 获取电力 PUE 数据
export const getPowerPUE = async () => {
  const response = await request<any>({
    url: "/api/power/pue",
    method: "get",
  });
  return response.data;
};
