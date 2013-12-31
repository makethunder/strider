#!/usr/bin/python

import os
import shutil
import commands

FREE_TARGET_GB = 50
ROOT_DIR = '/home/strider/.strider'

print 'Walking: ' + ROOT_DIR

dirs = []
for user in os.listdir(ROOT_DIR):
  for branch in os.listdir(os.path.join(ROOT_DIR, user)):
		path = os.path.join(ROOT_DIR,user,branch)
		info = os.stat(path)
		dirs.append((path,info))
dirs.sort(key = lambda d: d[1].st_mtime)

print 'Cache directory count: ', len(dirs)

def get_free():
	stats = os.statvfs(ROOT_DIR)
	return stats.f_bavail * stats.f_bsize / pow(1024,3)

while get_free() < FREE_TARGET_GB and len(dirs) > 0:
  print 'Free space (GB): %s < Target (GB): %s ' % (get_free(), FREE_TARGET_GB)
  path = dirs[0][0]
  dirs = dirs[1:]
  print 'Removing:', path
  status, output = commands.getstatusoutput('cd %s && vagrant destroy -f' % path)
  print 'Vagrant: ', output
  shutil.rmtree(path)
