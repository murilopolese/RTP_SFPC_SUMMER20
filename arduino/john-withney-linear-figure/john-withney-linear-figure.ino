// https://bitluni.net/esp32-composite-video
#include "esp_pm.h"
#include "CompositeGraphics.h"
#include "Image.h"
#include "CompositeOutput.h"
#include "luni.h"
#include "font6x8.h"
const int XRES = 320;
const int YRES = 200;
CompositeGraphics graphics(XRES, YRES);
CompositeOutput composite(CompositeOutput::NTSC, XRES * 2, YRES * 2);
Image<CompositeGraphics> luni0(luni::xres, luni::yres, luni::pixels);
Font<CompositeGraphics> font(6, 8, font6x8::pixels);
#include <soc/rtc.h>

int finger_count = 15;
float pos_a[2], size_a[2];
float angle_a, phase_a;
float pos_b[2], size_b[2];
float angle_b, phase_b;

float getScreenPosition(float p) {
    return map(p*100, -100, 100, -YRES/3, YRES/3);
}
float getSize(float s) {
    return map(s*100, -100, 100, 5, YRES/8);
}

void setup()
{
  //highest clockspeed needed
  esp_pm_lock_handle_t powerManagementLock;
  esp_pm_lock_create(ESP_PM_CPU_FREQ_MAX, 0, "compositeCorePerformanceLock", &powerManagementLock);
  esp_pm_lock_acquire(powerManagementLock);
  
  //initializing DMA buffers and I2S
  composite.init();
  //initializing graphics double buffer
  graphics.init();
  //select font
  graphics.setFont(font);

  //running composite output pinned to first core
  xTaskCreatePinnedToCore(compositeCore, "compositeCoreTask", 1024, NULL, 1, NULL, 0);
  //rendering the actual graphics in the main loop is done on the second core by default
}

void compositeCore(void *data)
{
  while (true)
  {
    //just send the graphics frontbuffer whithout any interruption 
    composite.sendFrameHalfResolution(&graphics.frame);
  }
}

void draw()
{
  graphics.begin(0);

  // Absolute position of ellipse
  float pax = getScreenPosition(pos_a[0])+(XRES/2);
  float pay = getScreenPosition(pos_a[1])+(YRES/2);
  float pbx = getScreenPosition(pos_b[0])+(XRES/2);
  float pby = getScreenPosition(pos_b[1])+(YRES/2);
  
  // Line from the center of the screen to group positions
  //graphics.line(XRES/2, YRES/2, pax, pay, 128);
  //graphics.line(XRES/2, YRES/2, pbx, pby, 128);
  
  // Line between group position
  //graphics.line(pax, pay, pbx, pby, 128);
  
  // Unitary magnitude for fingers
  float mag = sqrt(2);
  
  for (int i = 0; i < finger_count; i++) {
    // ========= GROUP A =========
    
    // Rotated position of unitary finger
    float ax = mag * cos(phase_a + i * (PI/finger_count));
    float ay = mag * sin(phase_a + i * (PI/finger_count));
    
    // Scaled position for finger
    float aw = getSize(size_a[0]);
    float ah = getSize(size_a[1]);
    
    // Rotate scaled finger https://en.wikipedia.org/wiki/Rotation_matrix
    float _ax = ax * cos(angle_a) - ay * sin(angle_a);
    float _ay = ax * sin(angle_a) + ay * cos(angle_a);
    
    // Draw a dot on the fingers
    //graphics.dot(pax + _ax*aw, pay + _ay*ah, 128);
    
    // ========= GROUP B =========
    
    float bx = mag * cos(phase_b + i * (PI/30));
    float by = mag * sin(phase_b + i * (PI/30));
    
    // Scaled position for finger
    float bw = getSize(size_b[0]);
    float bh = getSize(size_b[1]);
    
    // Rotate scaled finger https://en.wikipedia.org/wiki/Rotation_matrix
    float _bx = bx * cos(angle_b) - by * sin(angle_b);
    float _by = bx * sin(angle_b) + by * cos(angle_b);
    
    // Draw a dot on the fingers
    //graphics.dot(pbx + _bx*bw, pby + _by*bh, 128);

    // CONNECT FINGERS FROM GROUP A TO GROUP B
    graphics.line(pax + _ax*aw, pay + _ay*ah, pbx + _bx*bw, pby + _by*bh, 128);
  }
  graphics.end();
}

void update() 
{
  float t = millis()/(2000.0);
  pos_a[0] = cos(2*t);
  pos_a[1] = sin(2*t);
  pos_b[0] = cos(180+3*t);
  pos_b[1] = sin(2*t)/2;
  size_a[0] = 1;
  size_a[1] = 1;
  size_b[0] = 1;
  size_b[1] = 1;
  size_a[0] = sin(t);
  size_a[1] = sin(2*t);
  size_b[0] = sin(180+2*t);
  size_b[1] = sin(180+t);
  angle_a = t * 2;
  angle_b = 0;
  phase_a = 0;
  phase_b = -t * 4;
}

void loop()
{
  update();
  draw();
}
