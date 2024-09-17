'use client';

import React, { useState, useEffect } from 'react';
import { Table, Dropdown, Menu, Button, message } from 'antd';
import { useRouter } from 'next/navigation';
import { ISegment } from '@/common.types';
import { formatDate } from '@/utils/formatDate';
import { deleteSegment, getAllSegments } from '@/services/SegmentService';

const SegmentTable: React.FC = () => {
  const [segments, setSegments] = useState<ISegment[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchSegments = async () => {
      try {
        const data = await getAllSegments();
        setSegments(data);
      } catch (error) {
        message.error('Error al obtener los segmentos');
        console.error('Error:', error);
      }
    };

    fetchSegments();
  }, []);

  const handleMenuClick = async (e: any, record: ISegment) => {
    try {
      switch (e.key) {
        case 'edit':
          router.push(`/segments/edit/${record.id}`);
          break;
        case 'delete':
          await deleteSegment(record.id);
          message.success('Segmento eliminado con éxito');
          // Refetch segments after deletion
          const data = await getAllSegments();
          setSegments(data);
          break;
        case 'view':
          router.push(`/segments/${record.id}`);
          break;
        default:
          break;
      }
    } catch (error) {
      message.error('Error al realizar la acción');
      console.error('Error:', error);
    }
  };

  const menu = (record: ISegment) => (
    <Menu onClick={(e) => handleMenuClick(e, record)}>
      <Menu.Item key="delete">
        Eliminar
      </Menu.Item>
      <Menu.Item key="view">
        Ver detalles
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Numero de segmento',
      dataIndex: 'segmentNumber',
      key: 'segmentNumber',
    },
    {
      title: 'Nomenclatura',
      dataIndex: 'nomenclature',
      key: 'nomenclature',
    },
    {
      title: 'Largo',
      dataIndex: 'length',
      key: 'length',
    },
    {
      title: 'Fecha de creación',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt: string) => formatDate(createdAt),
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_: any, record: ISegment) => (
        <Dropdown overlay={menu(record)} trigger={['click']}>
          <Button>Acciones</Button>
        </Dropdown>
      ),
    },
  ];

  const onRowClick = (record: ISegment) => {
    return {
      onClick: () => {
        router.push(`/segments/${record.id}`);
      },
    };
  };

  return (
    <div>
      {/* Add the button to navigate to the create segment page */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
        <Button type="primary" onClick={() => router.push('/segments/create')}>
          Crear Segmento
        </Button>
      </div>

      <Table
        dataSource={segments}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        onRow={onRowClick}
      />
    </div>
  );
};

export default SegmentTable;
