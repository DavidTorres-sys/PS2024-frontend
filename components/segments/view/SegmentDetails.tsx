'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

import {
  Descriptions,
  message,
  List,
  Card,
  Spin,
  Typography
} from 'antd';

import { ISegment } from '@/common.types';
import { getSegmentById } from '@/services/SegmentService';
import { formatDate } from '@/utils/formatDate';

const { Title } = Typography;

const SegmentDetails: React.FC = () => {
  const [segment, setSegment] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const fetchSegment = async () => {
      try {
        const segmentId = Number(id);
        if (isNaN(segmentId)) {
          throw new Error('ID inválido');
        }

        const data = await getSegmentById(segmentId);
        setSegment(data);
      } catch (error) {
        message.error('Error al obtener los detalles del segmento');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSegment();
  }, [id]);

  if (loading) {
    return <Spin tip="Cargando detalles del segmento..." />;
  }

  if (!segment) {
    return <p>No se encontraron detalles para este segmento.</p>;
  }

  return (
    <div className="container mx-auto p-6 bg-white mt-10">
      <Title level={3} className="text-gray-800">Segmento #{segment.segmentNumber}</Title>

      <Descriptions
        bordered
        column={1}
        size="middle"
        title="Detalles del Segmento"
        className="bg-white shadow-md p-4"
      >
        <Descriptions.Item label="Numero de segmento">
          {segment.segmentNumber}
        </Descriptions.Item>
        <Descriptions.Item label="Nomenclatura">
          {segment.nomenclature}
        </Descriptions.Item>
        <Descriptions.Item label="Largo">
          {segment.length} metros
        </Descriptions.Item>
        <Descriptions.Item label="Fecha de Creación">
          {formatDate(segment.createdAt)}
        </Descriptions.Item>
        <Descriptions.Item label="Última Actualización">
          {formatDate(segment.updatedAt)}
        </Descriptions.Item>
      </Descriptions>

      <Title level={4} className="mt-6 text-gray-800">Calzadas</Title>
      <List
        grid={{ gutter: 16, column: 2 }}
        dataSource={segment.roads}
        renderItem={(road: any) => (
          <List.Item>
            <Card title={`Calzada ${road.id}`} className="bg-white shadow-md">
              <p className="text-gray-700">Tipo de pavimento: {road.pavement_type}</p>
              <p className="text-gray-700">Largo: {road.length} M</p>
            </Card>
          </List.Item>
        )}
      />

      <Title level={4} className="mt-6 text-gray-800">Bordillos</Title>
      <List
        grid={{ gutter: 16, column: 2 }}
        dataSource={segment.curbs}
        renderItem={(curb: any)=> (
          <List.Item>
            <Card title={`Bordillo ${curb.id}`} className="bg-white shadow-md">
              <p className="text-gray-700">Material: {curb.material}</p>
              <p className="text-gray-700">Largo: {curb.length} M</p>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default SegmentDetails;
